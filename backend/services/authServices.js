const bcrypt = require('bcrypt');
const { user } = require('../database/schema/users');
const { eq } = require('drizzle-orm');
const jwt = require('jsonwebtoken');
const { db } = require('../config/db');

const generateToken = (userData) => {
    const accessToken = jwt.sign(
        { id: userData.id, name: userData.name, email: userData.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { id: userData.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
};

// 2. Register User
const registeUser = async ({ name, email, password }) => {
    const normalizedEmail = email.toLowerCase();

    const existingUser = await db.query.user.findFirst({
        where: eq(user.email, normalizedEmail)
    });

    if (existingUser) {
        throw new Error('User with this email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db.insert(user).values({
        name,
        email: normalizedEmail,
        password: hashedPassword,
    }).returning();

    const { accessToken, refreshToken } = generateToken(newUser);

    await db.update(user)
        .set({ refreshToken })
        .where(eq(user.id, newUser.id));

    return { newUser, accessToken, refreshToken };
};

// 3. Login User
const login = async ({ email, password }) => {
    if (!email) {
        throw new Error("Email is missing.");
    }

    const existingUser = await db.query.user.findFirst({
        where: eq(user.email, email.toLowerCase()),
    });

    if (!existingUser) {
        throw new Error('User with this email does not exist');
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
        throw new Error("Invalid credentials payload verification failed.");
    }

    const { accessToken, refreshToken } = generateToken(existingUser);

    await db.update(user)
        .set({ refreshToken })
        .where(eq(user.id, existingUser.id));

    return { existingUser, accessToken, refreshToken };
};

// 4. Verify User
const verifyUser = async ({ userId }) => {
    const existingUser = await db.query.user.findFirst({
        where: eq(user.id, userId),
    });

    if (!existingUser) {
        throw new Error('User not found');
    }

    const { password: _, refreshToken: __, ...safeUser } = existingUser;
    return safeUser;
};

// 5. Rotate Refresh Token
const rotateRefreshToken = async (incomingRefreshToken) => {
    if (!incomingRefreshToken) {
        throw new Error('Refresh token is missing.');
    }

    let decoded;
    try {
        decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired refresh token.');
    }

    const existingUser = await db.query.user.findFirst({
        where: eq(user.id, decoded.id)
    });

    if (!existingUser) {
        throw new Error('User not found.');
    }

    if (existingUser.refreshToken !== incomingRefreshToken) {
        await db.update(user)
            .set({ refreshToken: null })
            .where(eq(user.id, existingUser.id));
        throw new Error('Token reuse detected. Please log in again.');
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken(existingUser);

    await db.update(user)
        .set({ refreshToken: newRefreshToken })
        .where(eq(user.id, existingUser.id));

    return { accessToken, newRefreshToken };
};

// 6. Logout User
const logoutUser = async (userId) => {
    await db.update(user)
        .set({ refreshToken: null })
        .where(eq(user.id, userId));
};

module.exports = {
    registeUser,
    login,
    verifyUser,
    rotateRefreshToken,
    logoutUser
};

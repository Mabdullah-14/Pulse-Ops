const { registeUser, login, verifyUser, rotateRefreshToken, logoutUser } = require('../services/authServices');

const isProduction = process.env.NODE_ENV === 'production';

const refreshCookie_Option = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000
};

const handleRegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, email and password are required'
            });
        }

        const result = await registeUser({ name, email, password });
        const { password: _, refreshToken: __, ...safeUser } = result.newUser;

        res.cookie('refreshToken', result.refreshToken, refreshCookie_Option);
        return res.status(201).json({
            success: true,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            user: safeUser
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const handleLoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const authData = await login({ email, password });
        const { password: _, refreshToken: __, ...safeUser } = authData.existingUser;

        res.cookie('refreshToken', authData.refreshToken, refreshCookie_Option);
        return res.status(200).json({
            success: true,
            message: 'Login successfully',
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
            user: safeUser
        });

    } catch (error) {
        console.log('LOGIN FAILED:', error.message);
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

const handleVerifyUser = async (req, res) => {
    try {
        const userId = req?.user.id;
        const user = await verifyUser({ userId });

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const handleRefreshToken = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken || req.headers['x-refresh-token'];
        if (!incomingRefreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Refresh token is missing.'
            });
        }

        const { accessToken, newRefreshToken } = await rotateRefreshToken(incomingRefreshToken);

        res.cookie('refreshToken', newRefreshToken, refreshCookie_Option);
        return res.status(200).json({
            success: true,
            accessToken,
            refreshToken: newRefreshToken
        });

    } catch (error) {
        console.log('REFRESH FAILED:', error.message);
        return res.status(401).json({ success: false, message: error.message });
    }
};

const handleLogoutUser = async (req, res) => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            path: '/'
        });

        const userId = req.user?.id;
        if (userId) {
            await logoutUser(userId);
        } else {
            const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
            if (incomingRefreshToken) {
                try {
                    const jwt = require('jsonwebtoken');
                    const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
                    if (decoded?.id) {
                        await logoutUser(decoded.id);
                    }
                } catch (_) {}
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Logout successfully'
        });

    } catch (error) {
        console.log('LOGOUT FAILED:', error.message);
        return res.status(200).json({ success: true, message: 'Logout successfully' });
    }
};

module.exports = {
    handleLoginUser,
    handleRegisterUser,
    handleVerifyUser,
    handleLogoutUser,
    handleRefreshToken
};

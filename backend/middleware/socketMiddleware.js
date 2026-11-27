const jwt = require('jsonwebtoken');

const socketMiddleware = (socket, next) => {
    try {
        const rawToken = socket.handshake.auth?.token;
        const token =
            rawToken && rawToken.startsWith('Bearer ')
                ? rawToken.split(' ')[1]
                : rawToken;

        if (!token || token === 'undefined') {
            return next(new Error('Access Denied. Token missing.'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded;
        next();
    } catch (error) {
        return next(
            new Error(
                error.name === 'TokenExpiredError'
                    ? 'Session expired. Please log in again.'
                    : 'Invalid token. Please log in again.'
            )
        );
    }
};

module.exports = {
    socketMiddleware,
};

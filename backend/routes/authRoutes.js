const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { handleRegisterUser, handleLoginUser, handleVerifyUser, handleLogoutUser, handleRefreshToken } = require('../controller/authController');
const { authMiddleware } = require('../middleware/authMiddlware');
const { validateBody } = require('../middleware/validateMiddleware');
const { authLimiter } = require('../middleware/rateLimiter')
const { registerSchema, loginSchema } = require('../validators/authvalidator');


router.post('/register', authLimiter, validateBody(registerSchema), handleRegisterUser);
router.post('/login', authLimiter, validateBody(loginSchema), handleLoginUser);
router.post('/logout', handleLogoutUser);
router.post('/refresh-token', handleRefreshToken);
router.get('/verify-user', authMiddleware, handleVerifyUser);

module.exports = router;

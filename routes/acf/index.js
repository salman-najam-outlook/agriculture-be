
const express = require('express');
const crypto = require('crypto');
const router = express.Router();

// Generate a unique static token (should be stored securely in env in production)
const STATIC_API_TOKEN = crypto.createHash('sha256').update('dimitra-unique-static-key-2025').digest('hex');

// Middleware to check token in header
function apiTokenAuth(req, res, next) {
	const token = req.headers['x-api-token'];
	if (!token || token !== STATIC_API_TOKEN) {
		return res.status(401).json({ message: 'Unauthorized: Invalid or missing API token.' });
	}
	next();
}

// Apply token auth to all routes in this router
router.use(apiTokenAuth);


const rolesRouter = require('./roles') 
const organizationRouter = require('./organization')
const moduleRouter = require('./module')
const userRouter = require('./user')

router.use('/roles', rolesRouter);
router.use('/organization', organizationRouter);
router.use('/module', moduleRouter);
router.use('/users', userRouter);

module.exports = router;

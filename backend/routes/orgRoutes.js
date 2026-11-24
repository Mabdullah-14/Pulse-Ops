const express = require('express')
const router = express.Router()
const { handleCreateOrganization, handleGetUserOrganizations } = require('../controller/orgController')
const { authMiddleware } = require('../middleware/authMiddlware')
const { validateBody } = require('../middleware/validateMiddleware')
const { selectiveMutationLimit } = require('../middleware/rateLimiter')
const { createOrgSchema } = require('../validators/orgvalidator')


router.post('/create-org', authMiddleware, selectiveMutationLimit, validateBody(createOrgSchema), handleCreateOrganization)
router.get('/get-org', authMiddleware, handleGetUserOrganizations)

module.exports = router
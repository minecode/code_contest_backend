// Import express
const express = require('express')

// Import books-controller
const contestsRoutes = require('../controllers/contests-controller.js')

// Create router
const router = express.Router()
router.use(function timeLog(req, res, next) {
  next()
})
router.get('/github/repos/location/:location', contestsRoutes.getGitReposByLocation)
router.get('/github/contributors/repo/:user/:repo', contestsRoutes.getContributorsByRepo )

// Export router
module.exports = router

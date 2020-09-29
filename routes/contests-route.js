// Import express
const express = require('express')

// Import books-controller
const contestsRoutes = require('../controllers/contests-controller.js')

// Create router
const router = express.Router()
router.use(function timeLog (req, res, next) {
  next()
})
router.get('/user', contestsRoutes.getAllUser)
router.get('/user/:userId', contestsRoutes.getUser)
router.post('/user/:userId/:firstName/:lastName/:imageUrl', contestsRoutes.user)
router.get('/global', contestsRoutes.getScore)
router.get('/global/:contestId', contestsRoutes.getScoreByContest)
router.get('/global/:contestId/:challengeId', contestsRoutes.getScoreByContestChallenge)
router.get('/:userId', contestsRoutes.getScoreByUser)
router.get('/list/:userId', contestsRoutes.getListByUser)
router.get('/:userId/:contestId/', contestsRoutes.getScoreByContestUser)
router.get('/:userId/:contestId/:challengeId/', contestsRoutes.getScoreByContestChallengeUser)
router.get("/contents/:contest/:challenge/:userId", contestsRoutes.getContentsGithub)
router.post('/:userId/:contestId/:challengeId/:score', contestsRoutes.scoreUserChallenge)
router.get('/:query', contestsRoutes.getRepos)
router.get('/:user', contestsRoutes.getUser)
router.get('/:user/:project', contestsRoutes.getReadme)

// Export router
module.exports = router
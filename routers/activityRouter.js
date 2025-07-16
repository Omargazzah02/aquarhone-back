const express = require ('express')
const router = express.Router()
const {getAvailableActivities ,getActivityById , addActivity , updateActivity , deleteActivity }  = require ('../controllers/activityController')
const {isAuthenticated, isAdmin}  = require ('../middlewares/authMiddlewars')

router.get('/all' , isAuthenticated ,getAvailableActivities)
router.get('/:activityId' , isAuthenticated , getActivityById)
//admin 

router.post('/add' , isAuthenticated , isAdmin , addActivity )
router.put('/update/:activityId' , isAuthenticated , isAdmin , updateActivity)
router.delete('/delete/:activityId' , isAuthenticated , isAdmin ,deleteActivity)
module.exports = router

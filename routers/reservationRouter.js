const express = require ('express')
const router = express.Router()
const {createReservation , getReservationHistory} = require('../controllers/reservationController')
const { isAuthenticated } = require('../middlewares/authMiddlewars')

router.post('/:activityId', isAuthenticated , createReservation )
router.get('/history' , isAuthenticated , getReservationHistory)

module.exports = router
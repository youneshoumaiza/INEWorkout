const express = require('express')
const {
    createWorkout,
    getWorkout,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controller/workoutController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require Auth for all workout routes
router.use(requireAuth)

router.get('/' , getWorkout)

router.get('/:id' , getSingleWorkout)

router.post('/' , createWorkout)

router.delete('/:id' , deleteWorkout)

router.patch('/:id' , updateWorkout)

module.exports = router 
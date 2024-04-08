const express = require('express')
const {
    createWorkout,
    getWorkout,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controller/workoutController')
const router = express.Router()

router.get('/' , getWorkout)

router.get('/:id' , getSingleWorkout)

router.post('/' , createWorkout)

router.delete('/:id' , deleteWorkout)

router.patch('/:id' , updateWorkout)

module.exports = router 
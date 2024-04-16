const Workout = require('../models/workoutModel')
const mongoose= require('mongoose')

//get all workouts 
const getWorkout = async (req,res)=>{
    const user_id = req.user._id
    const workouts = await Workout.find({ user_id }).sort({createdAt :-1})
    res.status(200).json(workouts)
}

//get a single workout
const getSingleWorkout = async (req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'workout not found'})
    }

    const workout = await Workout.findById(id)

    if(!workout){
       return res.status(404).json({error:'workout not found'})
    }
    res.status(200).json(workout)
}

//create a workout
const createWorkout= async (req, res)=>{
    const {title , reps , load} = req.body

    //handling msg errors
    let emptyfields = []

    if(!title) {
        emptyfields.push('title')
    }
    if(!reps) {
        emptyfields.push('reps')
    }
    if(!load) {
        emptyfields.push('load')
    }

    if(emptyfields.length>0){
        return res.status(400).json({error:'please fill in all the fields' , emptyfields})
    }

    //add doc to db
    try{
        const user_id = req.user._id
        const workout = await Workout.create({title , reps , load, user_id})
        res.status(200).json(workout)
    }catch (error){
        res.status(400).json({error :error.message})
    }
}

//delete a workout
const deleteWorkout=async (req,res)=>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'workout not found'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return res.status(404).json({error:'workout not found'})
     }
     res.status(200).json({msg:`workout with the id ${id} and is deleted successfully`})
     
}

//update a workout
const updateWorkout= async (req ,res)=>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'workout not found'})
    }

    const workout = await Workout.findByIdAndUpdate({_id:id},{
        ...req.body
    },{ new: true })
    if(!workout){
        return res.status(404).json({error:'workout not found'})
     }
     res.status(200).json(workout)
}

module.exports={
    createWorkout,getWorkout,getSingleWorkout,deleteWorkout,updateWorkout
}
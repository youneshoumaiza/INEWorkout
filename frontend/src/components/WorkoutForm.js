import React, { useState } from 'react'
import {useWorkoutsContext} from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'

function WorkoutForm() {
    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()
    const [title,setTitle] = useState('')
    const [load,setLoad] = useState('')
    const [reps,setReps] = useState('')
    const [error,setError] = useState(null)
    const [emptyFields , setEmptyFields] = useState([])

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!user){
            setError('you must be logged in')
            return
        }

        const workout = {title , load , reps}

        const response = await fetch('/api/workouts',{
            method:'POST',
            body : JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json',
                'Authorization' : `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyfields)
        }
        if(response.ok){
            console.log("workout added")
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            dispatch({type:'CREATE_WORKOUT' , payload:json})
        }


    }

  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Hi INE , add a new workout </h3>

        <label>Exercise title:</label>
        <input
        type="text"
        onChange={(e)=>{setTitle(e.target.value)}}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
        ></input>

        <label>load in Kg</label>
        <input
        type="number"
        onChange={(e)=>{setLoad(e.target.value)}}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
        ></input>

        <label>reps</label>
        <input
        type="number"
        onChange={(e)=>{setReps(e.target.value)}}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
        ></input> 

        <button>add Workout</button> 
        {error && <div className='error'>{error}</div>}     
    </form>
  )
}

export default WorkoutForm
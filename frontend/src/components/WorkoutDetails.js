import React from 'react'
import {useWorkoutsContext} from "../hooks/useWorkoutsContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'

function WorkoutDetails({workout}) {
  const {dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  const handleClick = () => {
    if(!user){
      return
    }
    document.getElementById('confirmationModal').style.display = 'block';
  };
  
  const confirmDeleteHandler = async () => {
    document.getElementById('confirmationModal').style.display = 'none';
    
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers:{
        'Authorization' : `Bearer ${user.token}`
      }
    });
  
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: { _id: workout._id } });
    }
  };
  
  const cancelDeleteHandler = () => {
    document.getElementById('confirmationModal').style.display = 'none';
  };
  
;

  return (
    <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong> {workout.load}</p>
        <p><strong>reps: </strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix : true})}</p>
        <span className='material-symbols-outlined' onClick={handleClick}>delete</span>

        <div id="confirmationModal" className="modal">
            <div className="modal-content">
              <p>Are you sure you want to delete this workout?</p>
              <button id="confirmDelete" onClick={confirmDeleteHandler}>Yes</button>
              <button id="cancelDelete" onClick={cancelDeleteHandler}>No</button>
            </div>
        </div>
    </div>

    
  )
}

export default WorkoutDetails
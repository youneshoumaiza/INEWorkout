import { workoutsContext } from "../context/WorkoutsContext";
import { useContext } from "react";

export const useWorkoutsContext = () =>{
    const context =useContext(workoutsContext) 

    if (!context){
        throw Error('useWorkoutsContext must be set inside a workoutsContextProvider')
    }

    return context
}


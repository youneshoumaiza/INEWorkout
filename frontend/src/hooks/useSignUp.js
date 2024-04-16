import { useState} from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = ()=>{
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch}= useAuthContext()

    const signup = async (email , password )=>{
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/user/signup' , {
            method: 'POST', 
            body : JSON.stringify({email ,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json = await response.json();
        if(!response.ok){
            setError(json.error)
            setIsLoading(false)
        }
        if(response.ok){
            dispatch({type:'LOGIN' , payload:json})

            setIsLoading(false)
            // save the use to local storage
            localStorage.setItem('user' , JSON.stringify(json))


        }
    }
    return {signup , isLoading , error}
}
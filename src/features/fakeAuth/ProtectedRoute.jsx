import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useSelector } from "react-redux"


export default function ProtectedRoute({children}) {
    const navigate=useNavigate()
    const isAuthenticated=useSelector((store)=>store.authenticate.isAuthenticated)

    useEffect(function(){
        if(!isAuthenticated)navigate("/")
    },[isAuthenticated,navigate])

  return isAuthenticated? children : null
}

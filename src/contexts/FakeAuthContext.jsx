import { createContext, useContext, useReducer } from "react";

const FAKE_USER={
    name:"Monika",
    email:"monika@email.cz",
    password:"heslo1",
}

const AuthContext=createContext()
const initialState={
    user:null,
    isAuthenticated:false
}

function reducer(state,action){
    switch(action.type){
        case "login":
        return{
            ...state,
            user:action.payload,
            isAuthenticated:true
        }
        case "logout":
            return{
                ...state,
                user:null,
                isAuthenticated:false
            }
        default:
            throw new Error("Unknown action")
    }
}

function AuthProvider({children}){

    function login(email,password){
        if(email===FAKE_USER.email && password===FAKE_USER.password)dispatch({type:"login",payload:FAKE_USER})
    }

    function logout(){
        dispatch({type:"logout"})
    }

    const[{user,isAuthenticated},dispatch]=useReducer(reducer,initialState)
    return(
        <AuthContext.Provider value={{user,isAuthenticated,login,logout}}>{children}</AuthContext.Provider>
    )
}

function useAuth(){
    const context=useContext(AuthContext)
    if(context===undefined)throw new Error("AuthContext was use outside AthProvider")
    return context
}

export{AuthProvider,useAuth}
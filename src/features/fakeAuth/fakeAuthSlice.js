


const initialStateAuth = {
	error: null,
	isLoading: false,
	user: null,
	isAuthenticated: false,
}

export default function authReducer(state = initialStateAuth, action) {
	switch (action.type) {
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
			return state
	}
}

export function login(user){
    return{type:"login",payload:user}
}

export function logout(){
    return{type:"logout"}
}
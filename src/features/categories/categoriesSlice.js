const initialStateCategories = {
	categories: [],
	error: null,
	isLoading: false,
}

export default function categoriesReducer(state = initialStateCategories, action) {
	switch (action.type) {
		case "loadingCategories":
			return {
				...state,
				isLoading: true,
				error: null,
			}
		case "rejectedCategories":
			return {
                ...state,
                error: action.payload,
				isLoading: false,
            }
        case "loadedCategories":
            return{
                ...state,
                isLoading:false,
                categories:action.payload,
            }    
		default:
			return state
	}
}

export function loadingCategories(){
    return{type:"loadingCategories"}
}
export function rejectedCategories(errMessage){
    return{type:"rejectedCategories",payload:errMessage}
}
export function loadedCategories(categories){
    return{type:"loadedCategories",payload:categories}
}

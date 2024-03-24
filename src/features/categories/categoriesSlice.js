const initialStateCategories = {
	categories: [],
	error: null,
	isLoading: false,
}

function categoriesReducer(state = initialStateCategories, action) {
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

function loadingCategories(){
    return{type:"loadingCategories"}
}
function rejectedCategories(errMessage){
    return{type:"rejectedCategories",payload:errMessage}
}
function loadedCategories(categories){
    return{type:"loadedCategories",payload:categories}
}

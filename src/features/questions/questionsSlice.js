const initialStateQuestions = {
	questions: [],
	error: null,
	isLoading: false,
}

function questionsReducer(state = initialStateQuestions, action) {
	switch (action.type) {
		case "loadingQuestions":
			return {
				...state,
				isLoading: true,
				error: null,
			}
		case "rejectedQuestions":
			return {
                ...state,
                error: action.payload,
				isLoading: false,
            }
        case "loadedQuestions":
            return{
                ...state,
                isLoading:false,
                questions:action.payload,
            }   
        case "questionCreate":
            return{
                ...state,
                questions: [...state.questions, action.payload],
				isLoading: false,
            } 
        case "questionDelete":
            return{...state,
                questions: state.questions.filter(
					(question) => question.id !== action.payload
				),
				isLoading: false,
            }
		default:
			return state
	}
}

function loadingQuestions(){
    return{type:"loadingQuestions"}
}
function rejectedQuestions(errMessage){
    return{type:"rejectedQuestions",payload:errMessage}
}
function loadedQuestions(questions){
    return{type:"loadedQuestions",payload:questions}
}
function questionCreate(newQuestion){
    return{type:"questionCreate",payload:newQuestion}
}
function questionDelete(question){
    return{type:"questionDelete",payload:question}
}

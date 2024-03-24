function getRandomQuestion(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min)
}

const initialStateQuestions = {
	questions: [],
	error: null,
	isLoading: false,
}

export default function questionsReducer(state = initialStateQuestions, action) {
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

export function loadingQuestions(){
    return{type:"loadingQuestions"}
}
export function rejectedQuestions(errMessage){
    return{type:"rejectedQuestions",payload:errMessage}
}
export function loadedQuestions(questions){
    return{type:"loadedQuestions",payload:questions}
}
export function questionCreate(newQuestion){
    return{type:"questionCreate",payload:newQuestion}
}
export function questionDelete(question){
    return{type:"questionDelete",payload:question}
}


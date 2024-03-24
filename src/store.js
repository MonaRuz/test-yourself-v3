// import { createStore } from "redux"

function getRandomQuestion(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min)
}

const initialStateCategories = {
	categories: [],
	error: null,
	isLoading: false,
}

const initialStateQuestions = {
	questions: [],
	error: null,
	isLoading: false,
}

const initialStateTest = {
	questions: [],
	testQuestions: [],
	error: null,
	isLoading: false,
	showTestAnswer: false,
	percentCounter: 0,
	progress: 1,
	currentTestQuestion: null,
}
const initialStateAuth = {
	error: null,
	isLoading: false,
	user: null,
	isAuthenticated: false,
}

function categoriesReducer(state = initialStateCategories, action) {
	switch (action.type) {
		case "loading":
			return {
				...state,
				isLoading: true,
				error: null,
			}
		case "rejected":
			return {
                ...state,
                error: action.payload,
				isLoading: false,
            }
        case "loaded":
            return{
                ...state,
                isLoading:false,
                categories:action.payload,
            }    
		default:
			return state
	}
}

function questionsReducer(state = initialStateQuestions, action) {
	switch (action.type) {
		case "loading":
			return {
				...state,
				isLoading: true,
				error: null,
			}
		case "rejected":
			return {
                ...state,
                error: action.payload,
				isLoading: false,
            }
        case "loaded":
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

function testReducer(state = initialStateTest, action) {
	switch (action.type) {
		case "loading":
			return {
				...state,
				isLoading: true,
				error: null,
			}
		case "rejected":
			return {
                ...state,
                error: action.payload,
				isLoading: false,
            }
        case "firstQuestion":
            return{
                ...state,
                currentTestQuestion:
					action.payload[getRandomQuestion(0, action.payload.length)],
            }
            case "answer/wrong":
                return {
                    ...state,
                    currentTestQuestion:
                        state.testQuestions[getRandomQuestion(0, state.testQuestions.length)],
                    showTestAnswer: false,
                    percentCounter: state.percentCounter + 1,
                }
            case "answer/correct":
                return {
                    ...state,
                    testQuestions: action.payload,
                    showTestAnswer: false,
                    currentTestQuestion:
                        action.payload[getRandomQuestion(0, action.payload.length)],
                    progress: state.progress + 1,
                }
            case "answer/show":
                return {
                    ...state,
                    showTestAnswer: true,
                }
            case "restart":
                return{
                    ...state,
                    progress:1,
                    percentCounter:0
                }
		default:
			return state
	}
}

function authReducer(state = initialStateAuth, action) {
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

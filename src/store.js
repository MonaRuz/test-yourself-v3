import { combineReducers, createStore } from "redux"

const rootReducer=combineReducers({
    categories:categoriesReducer,
    questions:questionsReducer,
    test:testReducer,
    authenticate:authReducer

})

const store=createStore(rootReducer)

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

function testReducer(state = initialStateTest, action) {
	switch (action.type) {
        case "firstQuestion":
            return{
                ...state,
                currentTestQuestion:
					action.payload[getRandomQuestion(0, action.payload.length)],
            }
            case "wrongAnswer":
                return {
                    ...state,
                    currentTestQuestion:
                        state.testQuestions[getRandomQuestion(0, state.testQuestions.length)],
                    showTestAnswer: false,
                    percentCounter: state.percentCounter + 1,
                }
            case "correctAnswer":
                return {
                    ...state,
                    testQuestions: action.payload,
                    showTestAnswer: false,
                    currentTestQuestion:
                        action.payload[getRandomQuestion(0, action.payload.length)],
                    progress: state.progress + 1,
                }
            case "showAnswer":
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

function firstQuestion(testQuestions){
    return{type:"firstQuestion",payload:testQuestions}
}
function wrongAnswer(){
    return{type:"wrongAnswer"}
}
function correctAnswer(updatedQuestions){
    return{type:"correctAnswer",payload:updatedQuestions}
}
function showAnswer(){
    return{type:"showAnswer"}
}
function restart(){
    return{type:"restart"}
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

function login(user){
    return{type:"login",payload:user}
}

function logout(){
    return{type:"logout"}
}

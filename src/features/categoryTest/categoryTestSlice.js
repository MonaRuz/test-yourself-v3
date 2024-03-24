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
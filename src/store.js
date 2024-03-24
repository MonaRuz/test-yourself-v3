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














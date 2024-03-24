import { combineReducers, createStore } from "redux"
import categoriesReducer from "./features/categories/categoriesSlice"
import categoryTestReducer from "./features/categoryTest/categoryTestSlice"
import fakeAuthReducer from "./features/fakeAuth/fakeAuthSlice"
import questionsReducer from "./features/questions/questionsSlice"

const rootReducer = combineReducers({
	categories: categoriesReducer,
	questions: questionsReducer,
	categoryTest: categoryTestReducer,
	authenticate: fakeAuthReducer,
})

const store = createStore(rootReducer)
 export default store
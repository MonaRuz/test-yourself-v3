import { applyMiddleware, combineReducers, createStore } from "redux"
import categoriesReducer from "./features/categories/categoriesSlice"
import categoryTestReducer from "./features/categoryTest/categoryTestSlice"
import fakeAuthReducer from "./features/fakeAuth/fakeAuthSlice"
import questionsReducer from "./features/questions/questionsSlice"
import { thunk } from "redux-thunk"

const rootReducer = combineReducers({
	categories: categoriesReducer,
	questions: questionsReducer,
	categoryTest: categoryTestReducer,
	authenticate: fakeAuthReducer,
})

const store = createStore(rootReducer,applyMiddleware(thunk))
 export default store
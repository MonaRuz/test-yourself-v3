import { useEffect, useReducer} from "react"
import styles from "./Questions.module.css"
import SearchQuestion from "./SearchQuestion"
import Question from "./Question"
import { useQuestions } from "..//contexts/QuestionsContext"
import { useParams } from "react-router-dom"

const initialState={
	searchQuery:"",
	isOpen:null,
}

function reducer(state,action){
	switch(action.type){
		case "setSearchQuery":
			return{...state,searchQuery:action.payload}
		case "toggleOpen":
			return{...state,isOpen:action.payload===state.isOpen ? null : action.payload}
		default:
			throw new Error("Unknown action")
	}

}

export default function Questions() {
	const{questions,getQuestions}=useQuestions()

	const {category}=useParams()
	const[{searchQuery,isOpen},dispatch]=useReducer(reducer,initialState)

	const searchedQuestions =
		searchQuery.length > 0
			? questions?.filter((question) =>
					`${question.question}`
						.toLowerCase()
						.includes(searchQuery.toLowerCase()))
			: questions

	useEffect(function(){
		getQuestions(category)
	},[category])

	console.log(questions.length);

	return (
		<div>
			<SearchQuestion dispatch={dispatch} />
			<ul className={styles.list}>
				{searchedQuestions?.map((question) => (
					<Question key={question.id} 
					question={question.question} 
					answer={question.answer} 
					id={question.id} 
					isOpen={question.id===isOpen} 
					dispatch={dispatch}
					/>
				))}
			</ul>
		</div>
	)
}

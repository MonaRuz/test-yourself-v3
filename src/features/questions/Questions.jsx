import { useEffect, useReducer } from "react"
import styles from "./Questions.module.css"
import SearchQuestion from "./SearchQuestion"
import Question from "./Question"
import { useQuestions } from "../../contexts/QuestionsContext"
import { useNavigate, useParams } from "react-router-dom"
import Button from "../../UI/Button"
import Loader from "../../UI/Loader"
import Error from "../../UI/Error"

const initialState = {
	searchQuery: "",
	isOpen: null,
}

function reducer(state, action) {
	switch (action.type) {
		case "setSearchQuery":
			return { ...state, searchQuery: action.payload }
		case "toggleOpen":
			return {
				...state,
				isOpen: action.payload === state.isOpen ? null : action.payload,
			}
		default:
			throw new Error("Unknown action")
	}
}

export default function Questions() {
	const { questions, getQuestions, isLoading, error } = useQuestions()

	const { category } = useParams()
	const [{ searchQuery, isOpen }, dispatch] = useReducer(reducer, initialState)
	const navigate = useNavigate()

	const searchedQuestions =
		searchQuery.length > 0
			? questions?.filter((question) =>
					`${question.question}`
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
			  )
			: questions

	useEffect(
		function () {
			getQuestions(category)
		},
		[category]
	)

	if (isLoading) return <Loader />
	if (error) return <Error>{error}</Error>
	return (
		<div>
			<h3 className="text-yellow-200 uppercase text-center my-3">
				Questions and answers in category {category}
			</h3>
			<div className=" border-b border-blue-200 pb-3 flex flex-col">
				<div className="flex gap-3 justify-around my-3 ">
				<button className="text-red-200 border border-red-200 px-3 py-2 uppercase sm:w-30"
					onClick={() => navigate(-1)}
				>
					Back
				</button>
				<button className=" text-green-200 border border-green-200 py-1 px-2 uppercase"
					onClick={() => navigate("new-question")}
				>
					Add question
				</button>
				</div>
				
				<SearchQuestion dispatch={dispatch} />
			</div>

			<ul>
				{searchedQuestions?.map((question) => (
					<Question
						key={question.id}
						question={question}
						isOpen={question.id === isOpen}
						dispatch={dispatch}
					/>
				))}
			</ul>
		</div>
	)
}

import { useEffect, useReducer } from "react"
import styles from "./Questions.module.css"
import SearchQuestion from "./SearchQuestion"
import Question from "./Question"
import { useQuestions } from "../../contexts/QuestionsContext"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import Button from "../../UI/Button"
import Loader from "../../UI/Loader"
import Error from "../../UI/Error"
import { getQuestions } from "../../services/testysFakeApi"

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
	// const { questions, getQuestions, isLoading, error } = useQuestions()
	const questions=useLoaderData()

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

	// if (isLoading) return <Loader />
	// if (error) return <Error>{error}</Error>
	return (
		<div>
			<h3 className={styles.title}>
				Questions and answers in category {category}
			</h3>
			<div className={styles.header}>
				<Button
					type='negative'
					onClick={() => navigate(-1)}
				>
					Back
				</Button>
				<Button
					type='confirm'
					onClick={() => navigate(`/questions/${category}/new-question`)}
				>
					Add question
				</Button>
				<SearchQuestion dispatch={dispatch} />
			</div>

			<ul className={styles.list}>
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

export async function loader({params}){
	const questions= await getQuestions(params.category)
	return questions
}
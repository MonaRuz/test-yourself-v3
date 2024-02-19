import {
	useEffect,
	createContext,
	useContext,
	useReducer,
} from "react"

const BASE_URL = "http://localhost:8000"

const QuestionsContext = createContext()

const initialState = {
	questions: [],
	testQuestions: [],
	error: "",
	categories: [],
	isLoading: false,
}

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return {
				...state,
				isLoading: true,
			}
		case "rejected":
			return {
				...state,
				error: action.payload,
				isLoading:false
			}
		case "categories/loaded":
			return {
				...state,
				categories: action.payload,
				isLoading: false,
			}
		case "questions/loaded":
			return {
				...state,
				questions: action.payload,
				testQuestions: action.payload,
				isLoading: false,
			}
		case "question/created":
			return{
				...state,
				questions:[...state.questions,action.payload],
				isLoading:false
			}
		case "question/deleted":
			return{
				...state,
				questions:state.questions.filter((question) => question.id !== action.payload),
				isLoading:false
			}
		default:
			throw new Error("Unknown action")
	}
}

function QuestionsProvider({ children }) {
	// const [questions, setQuestions] = useState([])
	// const [testQuestions, setTestQuestions] = useState([])
	// const [error, setError] = useState("")
	// const[creatingError,setCreatingError]=useState("")
	// const [categories, setCategories] = useState([])
	// const[isLoading,setIsLoading]=useState(false)
	const [
		{ questions, testQuestions, error, categories, isLoading },
		dispatch,
	] = useReducer(reducer, initialState)

	useEffect(function () {
		async function getCategories() {
			dispatch({ type: "loading" })
			try {
				const res = await fetch(`${BASE_URL}/categories`)

				if (!res.ok)
					throw new Error("Something went wrong with categories fetching.")

				const data = await res.json()
				dispatch({ type: "categories/loaded", payload: data })
			} catch (err) {
				dispatch({ type: "rejected", payload: err })
			}
		}
		getCategories()
	}, [])

	async function getQuestions(category) {
		dispatch({ type: "loading" })
		try {
			const res = await fetch(`${BASE_URL}/${category}/`)

			if (!res.ok)
				throw new Error("Something went wrong with questions fetching.")

			const data = await res.json()
			dispatch({ type: "questions/loaded", payload: data })
		} catch (err) {
			dispatch({ type: "rejected", payload: err })
		}
	}

	async function createQuestion(newQuestion, category) {
		dispatch({type:"loading"})
		try {
			const res = await fetch(`${BASE_URL}/${category}`, {
				method: "POST",
				body: JSON.stringify(newQuestion),
				headers: {
					"Content-Type": "application/json",
				},
			})
			if (!res.ok)
				throw new Error("Something went wrong with creating question.")
			dispatch({type:"question/created",payload:newQuestion})
		} catch (err) {
			dispatch({type:"rejected",payload:err})
		}
	}

	async function deleteQuestion(category, id) {
		dispatch({type:"loading"})
		try {
			const res = await fetch(`${BASE_URL}/${category}/${id}`, {
				method: "DELETE",
			})

			if (!res.ok)
				throw new Error("Something went wrong with question deleting.")
			dispatch({type:"question/deleted",payload:id})
			// setQuestions((questions) =>
			// 	questions.filter((question) => question.id !== id)
			// )
		} catch (err) {
			dispatch({type:"rejected",payload:err})
		} 
	}

	return (
		<QuestionsContext.Provider
			value={{
				questions,
				testQuestions,
				error,
				categories,
				getQuestions,
				createQuestion,
				deleteQuestion,
				isLoading,
			}}
		>
			{children}
		</QuestionsContext.Provider>
	)
}

function useQuestions() {
	const context = useContext(QuestionsContext)
	return context
}

export { QuestionsProvider, useQuestions }

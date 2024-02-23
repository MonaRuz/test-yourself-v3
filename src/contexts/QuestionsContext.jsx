import { useEffect, createContext, useContext, useReducer } from "react"

const BASE_URL = "http://localhost:8000"

const QuestionsContext = createContext()

function getRandomQuestion(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min)
}

const initialState = {
	questions: [],
	testQuestions: [],
	error: null,
	categories: [],
	isLoading: false,
	showTestAnswer: false,
	percentCounter: 0,
	progress: 1,
	currentTestQuestion: null,
}

function reducer(state, action) {
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
			return {
				...state,
				questions: [...state.questions, action.payload],
				isLoading: false,
			}
		case "question/deleted":
			return {
				...state,
				questions: state.questions.filter(
					(question) => question.id !== action.payload
				),
				isLoading: false,
			}
		case "question/test/current":
			return {
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
			throw new Error("Unknown action")
	}
}

function QuestionsProvider({ children }) {
	const [
		{
			questions,
			testQuestions,
			error,
			categories,
			isLoading,
			showTestAnswer,
			percentCounter,
			progress,
			currentTestQuestion,
		},
		dispatch,
	] = useReducer(reducer, initialState)

	const result = Math.ceil(
		100 - (percentCounter / (questions.length + percentCounter)) * 100
	)

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
				console.log(err.message)
				dispatch({ type: "rejected", payload: err.message })
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
			dispatch({ type: "rejected", payload: err.message })
		}
	}

	async function createQuestion(newQuestion, category) {
		dispatch({ type: "loading" })
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
			dispatch({ type: "question/created", payload: newQuestion })
		} catch (err) {
			dispatch({ type: "rejected", payload: err.message })
		}
	}

	async function deleteQuestion(category, id) {
		dispatch({ type: "loading" })
		try {
			const res = await fetch(`${BASE_URL}/${category}/${id}`, {
				method: "DELETE",
			})

			if (!res.ok)
				throw new Error("Something went wrong with question deleting.")
			dispatch({ type: "question/deleted", payload: id })
			// setQuestions((questions) =>
			// 	questions.filter((question) => question.id !== id)
			// )
		} catch (err) {
			dispatch({ type: "rejected", payload: err.message })
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
				showTestAnswer,
				percentCounter,
				result,
				progress,
				currentTestQuestion,
				getRandomQuestion,
				dispatch,
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

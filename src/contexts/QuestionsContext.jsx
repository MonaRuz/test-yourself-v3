import { useState, useEffect, createContext, useContext } from "react"

const BASE_URL = "http://localhost:8000"

const QuestionsContext = createContext()

function QuestionsProvider({ children }) {
	const [questions, setQuestions] = useState([])
	const [testQuestions, setTestQuestions] = useState([])
	const [error, setError] = useState("")
	const[creatingError,setCreatingError]=useState("")
	const [categories, setCategories] = useState([])
	const[isLoading,setIsLoading]=useState(false)

	useEffect(function () {
		async function getCategories() {
			setIsLoading(true)
			try {
				const res = await fetch(`${BASE_URL}/categories`)

				if (!res.ok)
					throw new Error("Something went wrong with categories fetching.")

				const data = await res.json()
				setCategories(data)
			} catch (err) {
				console.error(err.message)
				setError("Something went wrong with categories fetching!")
			}finally{
				setIsLoading(false)
			}
		}
		getCategories()
	}, [])

	async function getQuestions(category) {
		setIsLoading(true)
		try {
			const res = await fetch(`${BASE_URL}/${category}/`)

			if (!res.ok)
				throw new Error("Something went wrong with questions fetching.")

			const data = await res.json()
			setQuestions(data)
			setTestQuestions(data)
		} catch (err) {
			console.error(err.message)
			setError("Something went wrong with questions fetching!")
		}finally{
			setIsLoading(false)
		}
	}

	async function createQuestion(newQuestion, category) {
		setIsLoading(true)
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
		} catch (err) {
			console.error(err.message)
			setCreatingError("Something went wrong with creating question.")
		}finally{
			setIsLoading(false)
		}
	}

	async function deleteQuestion(category, id) {
		setIsLoading(true)
		try {
			const res = await fetch(`${BASE_URL}/${category}/${id}`, {
				method: "DELETE",
			})

			if (!res.ok)
				throw new Error("Something went wrong with question deleting.")

			setQuestions((questions) =>
				questions.filter((question) => question.id !== id)
			)
		} catch (err) {
			console.error(err.message)
			setError("Something went wrong with question deleting!")
		}finally{
			setIsLoading(false)
		}
	}

	return (
		<QuestionsContext.Provider
			value={{
				questions,
				testQuestions,
				setTestQuestions,
				creatingError,
				categories,
				getQuestions,
				createQuestion,
				deleteQuestion,
				isLoading
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

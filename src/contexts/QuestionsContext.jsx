import { useState, useEffect, createContext, useContext } from "react"

const BASE_URL = "http://localhost:8000"

const QuestionsContext = createContext()

function QuestionsProvider({ children }) {
	const [questions, setQuestions] = useState([])
	const [testQuestions, setTestQuestions] = useState([])
	const [error, setError] = useState("")
	const[categories,setCategories]=useState([])

	useEffect(function () {
		async function getCategories() {
			try {
				const res = await fetch(`${BASE_URL}/categories`)

				if (!res.ok)
					throw new Error("Something went wrong with categories fetching.")

				const data = await res.json()
				setCategories(data)
			} catch (err) {
				console.error(err.message)
				setError("Something went wrong with categories fetching!")
			}
		}
		getCategories()
	}, [])

	async function getQuestions(category) {
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
		}
	}

	async function createQuestion(newQuestion,category) {
		try {
			const res = await fetch(`${BASE_URL}/${category}`,{
				method:"POST",
				body:JSON.stringify(newQuestion),
				headers:{
					"Content-Type":"application/json"
				}
			})

			if (!res.ok)
				throw new Error("Something went wrong with creating question.")

			const data = await res.json()
			console.log(data);
		} catch (err) {
			console.error(err.message)
			setError("Something went wrong with questions fetching!")
		}
	}



	

	return (
		<QuestionsContext.Provider value={{ questions, testQuestions,setTestQuestions, error,categories,getQuestions,createQuestion}}>
			{children}
		</QuestionsContext.Provider>
	)
}

function useQuestions(){
    const context=useContext(QuestionsContext)
    return context
}

export {QuestionsProvider,useQuestions}

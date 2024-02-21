import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { projectFirestore } from "../firebase/config"

const Test = () => {
	const [questions, setQuestions] = useState([])
	const [error, setError] = useState(false)
	const [testQuestions, setTestQuestions] = useState([])
	const [categories,setCategories]=useState([])
	const [category,setCategory]=useState("")
	const { categoryId } = useParams()

	//fetch concrete category
	useEffect(() => {
		const unsubscribe = projectFirestore
			.collection(`categories/${categoryId}/questions`)
			.onSnapshot(
				(snapshot) => {
					if (snapshot.empty) {
						setError("Zatím nebyla vytvořena žádná otázka")
						setQuestions([])
					} else {
						let result = []
						snapshot.docs.forEach((oneCategory) => {
							result.push({ id: oneCategory.id, ...oneCategory.data() })
						})
						setQuestions(result)
						setError(false)
					}
				},
				(err) => {
					setError("Zatím nebyly přidány žádné otázky" + err.message)
				}
			)
		//cleanup function
		return () => {
			unsubscribe()
		}
	}, [categoryId])

	//fetch all categories(for category name)
	useEffect(() => {
		const unsubscribe2 = projectFirestore
			.collection(`categories`)
			.onSnapshot(
				(snapshot) => {
					if (snapshot.empty) {
						setError("Zatím nebyla vytvořena žádná otázka")
						setCategory("")
					} else {
						let result = []
						snapshot.docs.forEach((oneCategory) => {
							result.push({ id: oneCategory.id, ...oneCategory.data() })
						})
						setError(false)
						setCategories(result)
					}
					const currentCategory=categories.find((oneCategory)=>{
						return categoryId===oneCategory.id
					})
					setCategory(currentCategory.category)
					console.log(category);
				},
				(err) => {
					setError("Zatím nebyly přidány žádné otázky" + err.message)
				}
			)
			//cleanup function
		return () => {
			unsubscribe2()
		}
	},[])

	//fetch test questions if exist, if not sending questions to database
	useEffect(() => {
		projectFirestore.collection(`test${categoryId}`).onSnapshot((snapshot) => {
			let result = []
			snapshot.docs.forEach((oneQuestion) => {
				result.push({ id: oneQuestion.id, ...oneQuestion.data() })
			})
			setTestQuestions(result)
		})
		
	},[categoryId,questions])

	return (
		<section>
			<h3>Test kategorie {category}</h3>
		</section>
	)
}

export default Test

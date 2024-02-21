import { useParams,Link } from "react-router-dom"
import { projectFirestore } from "../firebase/config"
import { useState, useEffect} from "react"

const Questions = () => {
	const [data, setData] = useState([])
	const { categoryId } = useParams()
	const [error, setError] = useState(false)
	const [newQuestion, setNewQuestion] = useState("")
	const [newAnswer, setNewAnswer] = useState("")
	const [categories,setCategories]=useState([])
	const [categoryName,setCategoryName]=useState("")
	

	//fetch concrete category
	useEffect(() => {
		const unsubscribe = projectFirestore
			.collection(`categories/${categoryId}/questions`)
			.onSnapshot(
				(snapshot) => {
					if (snapshot.empty) {
						setError("Zatím nebyla vytvořena žádná otázka")
						setData([])
					} else {
						let result = []
						snapshot.docs.forEach((oneCategory) => {
							result.push({ id: oneCategory.id, ...oneCategory.data() })
						})
						setData(result)
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


	//fetch categories
	useEffect(()=>{
		const unsubscribe = projectFirestore
			.collection(`categories`)
			.onSnapshot(
				(snapshot) => {
					if (snapshot.empty) {
						setError("Nepodařilo se získat název kategorie.")
						setData([])
					} else {
						let result = []
						snapshot.docs.forEach((oneCategory) => {
							result.push({ id: oneCategory.id, ...oneCategory.data() })
						})
						setCategories(result)
						const thisCategory=categories.find((oneCategory)=>{
							return oneCategory.id===categoryId
						})
						setCategoryName(thisCategory.category)
						setError(false)
					}
				}
				)
				//cleanup function
				return () => {
					unsubscribe()
				}
			},[categoryId,categories])
			

	//delete question
	const deleteQuestion = (id) => {
		projectFirestore
			.collection(`categories/${categoryId}/questions`)
			.doc(id)
			.delete()
	}

	const addQuestions = async (e) => {
		e.preventDefault()
		//save state n object
		const createdQuestion = { question: newQuestion, answer: newAnswer }
		//sending object to database
		try {
			await projectFirestore
				.collection(`categories/${categoryId}/questions`)
				.add(createdQuestion)
			//delete input fields
			setNewQuestion("")
			setNewAnswer("")
		} catch (err) {
			setError("Otázku se nepodařilo přidat" + err)
		}
	}


	return (
		<section>
			<div className="start-test">
				<Link to={`/test/${categoryId}`}>Spustit test kategorie {categoryName}</Link>
			</div>
			<div
				className='new-questions'
			>
				<h2>Vytvořte další otázku:</h2>
				<form onSubmit={addQuestions}>
					<label htmlFor='new-question'>Otázka</label>
					<input
						type='text'
						id='new-question'
						onChange={(e) => setNewQuestion(e.target.value)}
						value={newQuestion}
					/>
					<label htmlFor='new-answer'>Odpověď</label>
					<input
						type='text'
						id='new-answer'
						onChange={(e) => setNewAnswer(e.target.value)}
						value={newAnswer}
					/>
					<input
						type='submit'
						value='Přidat otázku'
					/>
				</form>
			</div>
			<div>
				<h2>Otázky kategorie {categoryName}</h2>
				<div>
					{error && <p>{error}</p>}
					{data.map((oneQuestion) => {
						const { id, question, answer } = oneQuestion
						return (
							<div
								className='one-question'
								key={id}
							>
								<div>
									<p>{question}</p>
									<p>{answer}</p>
								</div>
								<div>
									<button
										type='button'
										onClick={() => {
											deleteQuestion(id)
										}}
									>
										x
									</button>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default Questions

import { useNavigate, useParams } from "react-router-dom"
import styles from "./newQuestion.module.css"
import { useQuestions } from "../../contexts/QuestionsContext"
import { useState } from "react"
import Loader from "../../UI/Loader"

export default function NewQuestion() {
	const [question, setQuestion] = useState("")
	const [answer, setAnswer] = useState("")
	const [wasSend, setWasSend] = useState(false)
	const [notes, setNotes] = useState("")
	const { createQuestion, error, isLoading } = useQuestions()
	const { category } = useParams()
	const navigate = useNavigate()

	async function handleClick(e) {
		e.preventDefault()
		if (notes) return
		const newQuestion = {
			question,
			answer,
		}
		setQuestion("")
		setAnswer("")
		setWasSend(true)
		await createQuestion(newQuestion, category)
	}

	return (
		<div>
			<p className="text-blue-200 py-1">
				Write some question and answer. Fields can't be empty.
			</p>
			<hr />
			<form className={styles.form}>
				<label
					className={styles.label}
					htmlFor='question'
				>
					New question
				</label>
				<textarea
					className={styles.input}
					rows='6'
					cols='10'
					id='question'
					value={question}
					onChange={(e) => setQuestion(e.target.value)}
				/>
				<label
					className={styles.label}
					htmlFor='answer'
				>
					New answer
				</label>
				<textarea
					className={styles.input}
					rows='6'
					cols='10'
					id='answer'
					value={answer}
					onChange={(e) => setAnswer(e.target.value)}
				/>
				<textarea
					className={styles.honeyPot}
					rows='6'
					cols='10'
					id='notes'
					value={notes}
					onChange={(e) => setNotes(e.target.value)}
				/>
				<div className="flex gap-3 py-3">
					<button className="text-red-200 border border-red-200 px-3 py-2"
						onClick={(e) => {
							e.preventDefault()
							navigate(-1)
						}}
					>
						Back
					</button>
					{question && answer && (
						<button className="text-green-200 border border-green-200 px-3 py-2"
							onClick={handleClick}
						>
							Add new question
						</button>
					)}
				</div>
			</form>
			{isLoading && wasSend && <Loader />}
			{!isLoading && error && <p className={styles.error}>{error}</p>}
			{!isLoading && !error && wasSend && (
				<p className={styles.message}>
					New question was added, now you can add more.
				</p>
			)}
		</div>
	)
}

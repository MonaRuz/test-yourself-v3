import { useNavigate, useParams } from "react-router-dom"
import Button from "./Button"
import styles from "./newQuestion.module.css"
import { useQuestions } from "../contexts/QuestionsContext"
import { useState } from "react"
import Loader from "./Loader"

export default function NewQuestion() {
	const [question, setQuestion] = useState("")
	const [answer, setAnswer] = useState("")
	const [wasSend, setWasSend] = useState(false)
	const { createQuestion, error, isLoading } = useQuestions()
	const { category } = useParams()
	const navigate = useNavigate()

	async function handleClick(e) {
		e.preventDefault()
		const newQuestion = {
			question,
			answer,
		}
		setQuestion("")
		setAnswer("")
		setWasSend(true)
		await createQuestion(newQuestion, category)
		// navigate(-1)
	}

	return (
		<div>
			<p className={styles.p}>Write some qiestion and answer. Fields can't be empty.</p>
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
				<div>
					<Button
						bgColor='var(--main-bg-color)'
						textColor='var(--negation-color)'
						onClick={(e) => {
							e.preventDefault()
							navigate(-1)
						}}
					>
						Back
					</Button>
					{question&&answer&&<Button
						bgColor='var(--main-bg-color)'
						textColor='var(--positive-color)'
						onClick={handleClick}
					>
						Add new question
					</Button>}
				</div>
			</form>
			{isLoading && wasSend && <Loader />}
			{!isLoading && error && (
				<p className={styles.error}>{error}</p>
			)}
			{!isLoading && !error && wasSend && (
				<p className={styles.message}>
					New question was added, now you can add more.
				</p>
			)}
		</div>
	)
}

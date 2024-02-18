import { useParams } from "react-router-dom"
import Button from "./Button"
import styles from "./newQuestion.module.css"
import { useQuestions } from "../contexts/QuestionsContext"
import { useState } from "react"

export default function NewQuestion() {
	const [question, setQuestion] = useState("")
	const [answer, setAnswer] = useState("")
	const { createQuestion } = useQuestions()
	const { category } = useParams()

	function handleClick(e) {
		e.preventDefault()
		const newQuestion = {
			question,
			answer,
		}
		createQuestion(newQuestion, category)
	}
  
	return (
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
			<Button
				bgColor='var(--main-bg-color)'
				textColor='var(--positive-color)'
				onClick={handleClick}
			>
				Add new question
			</Button>
		</form>
	)
}

import { useEffect, useState } from "react"
import Button from "./Button"
import styles from "./Test.module.css"
import {useQuestions} from "..//contexts/QuestionsContext"
import { useParams } from "react-router-dom"


export default function Test() {
	const [showAnswer, setShowAnswer] = useState(false)
	const [percentCounter, setpercentCounter] = useState(0)
	const [progress, setProgress] = useState(1)
	const [currentQuestion, setCurrentQuestion] = useState(null)
	const {category}=useParams()

	const{questions,testQuestions,setTestQuestions,getQuestions}=useQuestions()


	const result = Math.ceil(
		100 - (percentCounter / (questions.length + percentCounter)) * 100
	)

	function getRandomQuestion(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min) + min)
	}

	function handleWrongAnswer() {
		setCurrentQuestion(
			testQuestions[getRandomQuestion(0, testQuestions.length)]
		)
		setShowAnswer(false)
		setpercentCounter(percentCounter + 1)
	}

	function handleCorrectAnswer(id) {
		let updatedQuestions = testQuestions.filter((question) => {
			return question.id !== id
		})
		setTestQuestions(updatedQuestions)

		setShowAnswer(false)
		setCurrentQuestion(
			updatedQuestions[getRandomQuestion(0, updatedQuestions.length)]
		)
		setProgress(progress + 1)
	}

	useEffect(function(){
		getQuestions(category)
	},[category])

	useEffect(
		function () {
			setCurrentQuestion(
				testQuestions[getRandomQuestion(0, testQuestions.length)]
			)
		},
		[testQuestions]
	)

	if (testQuestions.length === 0)
		return <p className={styles.result}>Úspěšnost testu : {result}%</p>

	if (testQuestions.length !== 0)
		return (
			<div className={styles.test}>
				<div className='test-question'>
					{currentQuestion && (
						<p className={styles.question}>{currentQuestion?.question}</p>
					)}

					{showAnswer && (
						<p className={styles.answer}>{currentQuestion?.answer}</p>
					)}
				</div>
				<div className={styles.btnBox}>
					{showAnswer && (
						<Button
							textColor='var(--negation-color)'
							bgColor='var(--main-bg-color)'
							onClick={handleWrongAnswer}
						>
							✘
						</Button>
					)}
					{!showAnswer && (
						<Button
							textColor='var(--menu-color)'
							bgColor='var(--main-bg-color)'
							onClick={() => setShowAnswer(true)}
						>
							Display answer
						</Button>
					)}

					{showAnswer && (
						<Button
							textColor='var(--positive-color)'
							bgColor='var(--main-bg-color)'
							onClick={() => handleCorrectAnswer(currentQuestion?.id)}
						>
							✔
						</Button>
					)}
				</div>
				<div>
					<p className={styles.progress}>
						Progress:
						<strong>
							{" "}
							{progress} / {questions.length}
						</strong>{" "}
					</p>
				</div>
				<p className={styles.instructions}>
					Answer the question as best you can, view the answer and see if you
					answered correctly. <br /> Then click on the corresponding button.
				</p>
			</div>
		)
	
}

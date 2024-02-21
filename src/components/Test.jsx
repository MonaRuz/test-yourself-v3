import { useEffect } from "react"
import Button from "./Button"
import styles from "./Test.module.css"
import { useQuestions } from "..//contexts/QuestionsContext"
import { useParams } from "react-router-dom"

export default function Test() {
	const { category } = useParams()

	const {
		questions,
		testQuestions,
		getQuestions,
		showTestAnswer,
		result,
		progress,
		currentTestQuestion,
		dispatch,
		status,
	} = useQuestions()

	function handleWrongAnswer() {
		dispatch({ type: "answer/wrong" })
	}

	function handleCorrectAnswer(id) {
		let updatedQuestions = testQuestions.filter((question) => {
			return question.id !== id
		})
		dispatch({ type: "answer/correct", payload: updatedQuestions })
	}

	useEffect(
		function () {
			getQuestions(category)
		},
		[category]
	)

	useEffect(function () {
		dispatch({ type: "question/test/current" })
	}, [])
	
	if (status === "ready")
		return (
			<Button
				bgColor='var(--main-bg-color)'
				textColor='var(--positive-color)'
				onClick={() => dispatch({ type: "test/running" })}
			>
				Start test
			</Button>
		)

	if (testQuestions.length === 0)
		return <p className={styles.result}>Úspěšnost testu : {result}%</p>

	if (status === "active")
		return (
			<div className={styles.test}>
				<div className='test-question'>
					{currentTestQuestion && (
						<p className={styles.question}>{currentTestQuestion?.question}</p>
					)}

					{showTestAnswer && (
						<p className={styles.answer}>{currentTestQuestion?.answer}</p>
					)}
				</div>
				<div className={styles.btnBox}>
					{showTestAnswer && (
						<Button
							textColor='var(--negation-color)'
							bgColor='var(--main-bg-color)'
							onClick={handleWrongAnswer}
						>
							✘
						</Button>
					)}
					{!showTestAnswer && (
						<Button
							textColor='var(--menu-color)'
							bgColor='var(--main-bg-color)'
							onClick={() => dispatch({ type: "answer/show" })}
						>
							Display answer
						</Button>
					)}

					{showTestAnswer && (
						<Button
							textColor='var(--positive-color)'
							bgColor='var(--main-bg-color)'
							onClick={() => handleCorrectAnswer(currentTestQuestion?.id)}
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

import { useEffect, useState } from "react"
import Button from "../../UI/Button"
import styles from "./Test.module.css"
import { useQuestions } from "../../contexts/QuestionsContext"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../UI/Loader"
import Results from "./Results"

export default function Test() {
	const { category } = useParams()
	const navigate = useNavigate()
	const [isRunning, setIsRunning] = useState(false)

	const {
		questions,
		testQuestions,
		getQuestions,
		showTestAnswer,
		progress,
		currentTestQuestion,
		dispatch,
		isLoading,
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

	// useEffect(
	// 	function () {
	// 		getQuestions(category)
	// 	},
	// 	[category]
	// )

	function handleGetQuestions() {
		getQuestions(category)
		setIsRunning(true)
	}

	useEffect(
		function () {
			dispatch({ type: "question/test/firstQuestion", payload: testQuestions })
		},
		[testQuestions, dispatch]
	)

	if (isLoading) return <Loader />
	if (testQuestions.length === 0 && isRunning) return <Results />

	return (
		<div className={styles.test}>
			{!isRunning ? (
				<div className={styles.btnBox}>
					<Button
						type='negative'
						onClick={() => navigate("/app")}
					>
						Back
					</Button>
					<Button
						type='confirm'
						onClick={handleGetQuestions}
					>
						Start Test
					</Button>
				</div>
			) : (
				<>
					<div className='test-question'>
						<p className={styles.question}>{currentTestQuestion?.question}</p>

						{showTestAnswer && (
							<p className={styles.answer}>{currentTestQuestion?.answer}</p>
						)}
					</div>
					<div className={styles.btnBox}>
						{showTestAnswer && (
							<Button
								type='negative'
								onClick={handleWrongAnswer}
							>
								✘
							</Button>
						)}
						{!showTestAnswer && (
							<Button
								type='primary'
								onClick={() => dispatch({ type: "answer/show" })}
							>
								Display answer
							</Button>
						)}

						{showTestAnswer && (
							<Button
								type='confirm'
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
					<div className={styles.btnBox}>
						<Button
							type='negative'
							onClick={() => navigate("/app")}
						>
							Stop Test
						</Button>
					</div>
				</>
			)}
		</div>
	)
}

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

	function handleGetQuestions(){
		getQuestions(category)
		setIsRunning(true)

	}

	useEffect(
		function () {
			dispatch({ type: "question/test/firstQuestion", payload: testQuestions })
		},
		[testQuestions,dispatch]
	)

	if (isLoading) return <Loader />
	if (testQuestions.length === 0 && isRunning) return <Results />

	return (
		<div className="text-center">
			{!isRunning ? (
					<div className="flex flex-col mt-3">

						<button className="text-red-200 border border-red-200 m-3 uppercase px-2 py-1"
							onClick={() => navigate("/app")}
						>
							Back
						</button>
						<button className="text-blue-200 border border-blue-200 m-3 uppercase px-2 py-1"
							onClick={handleGetQuestions}
						>
							Start Test
						</button>
					</div>
			) : (
				<>
					<div className='pt-3'>
						<p className="text-green-200 mb-3">{currentTestQuestion?.question}</p>

						{showTestAnswer && (
							<p className="text-yellow-200 my-3">{currentTestQuestion?.answer}</p>
						)}
					</div>
					<div className="flex justify-around my-4">
						{showTestAnswer && (
							<button className="text-red-300 border border-red-300 px-4 py-2"
								onClick={handleWrongAnswer}
							>
								✘
							</button>
						)}
						{!showTestAnswer && (
							<button
							className="text-yellow-200 uppercase border border-yellow-200 px-2 py-1 mb-3 w-full"
								onClick={() => dispatch({ type: "answer/show" })}
							>
								Display answer
							</button>
						)}

						{showTestAnswer && (
							<button className="text-green-200 border border-green-200 px-4 py-2"
								onClick={() => handleCorrectAnswer(currentTestQuestion?.id)}
							>
								✔
							</button>
						)}
					</div>
					<div>
						<p className="text-blue-200 text-center mt-3 text-xs">
							Progress:
							<strong>
								{" "}
								{progress} / {questions.length}
							</strong>{" "}
						</p>
					</div>
					<p className="text-blue-200 text-xs border-t border-blue-200 my-3 py-2">
						Answer the question as best you can, view the answer and see if you
						answered correctly. <br /> Then click on the corresponding button.
					</p>
					<div className={styles.btnBox}>
					<button className="text-red-200 border border-red-200 px-2 py-1 w-full uppercase mb-5"
							onClick={() => navigate("/app")}
						>
							Stop Test
						</button>
					</div>
				</>
			)}
		</div>
	)
}

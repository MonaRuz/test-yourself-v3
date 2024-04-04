import { Link, useParams } from "react-router-dom"
import styles from "./Question.module.css"
import Button from "../../UI/Button"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { deleteQuestion } from "../../services/testysFakeApi"
// import { useQuestions } from "../../contexts/QuestionsContext"

export default function Question({ question, isOpen, dispatch }) {
	const { category } = useParams()
	// const { deleteQuestion } = useQuestions()

	function handleClick() {
		deleteQuestion(category, question.id)
		
	}

	return (
		<div>
			<li>
				<div
					className={styles.questionBox}
					onClick={() => dispatch({ type: "toggleOpen", payload: question.id })}
				>
					<p
						className={
							!isOpen ? `${styles.question}` : `${styles.currentQuestion}`
						}
					>
						{question.question}
					</p>
					<p className={styles.btn}>
						{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
					</p>
				</div>
				{isOpen && (
					<div>
						<p className={styles.answer}>{question.answer}</p>
						<div className={styles.btnBox}>
							<Link
								className={styles.link}
								to={`${question.id}`}
							>
								<Button type='confirm'>Edit question</Button>
							</Link>

							<Button
								type='negative'
								onClick={handleClick}
							>
								Delete question
							</Button>
						</div>
					</div>
				)}
			</li>
			<hr className={styles.line} />
		</div>
	)
}

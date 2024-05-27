import { Link, useParams } from "react-router-dom"
import styles from "./Question.module.css"
import Button from "../../UI/Button"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { FaTrash,FaEdit } from "react-icons/fa";
import { useQuestions } from "../../contexts/QuestionsContext"

export default function Question({ question, isOpen, dispatch }) {
	const { category } = useParams()
	const { deleteQuestion } = useQuestions()

	function handleClick() {
		deleteQuestion(category, question.id)
	}

	return (
		<div>
			<li>
				<div
					className="flex justify-between text-sm"
					onClick={() => dispatch({ type: "toggleOpen", payload: question.id })}
				>
					<p
						className={
							!isOpen ? `text-green-200 m-2` : `text-green-200 m-2 border-b pb-2`
						}
					>
						{question.question}
					</p>
					<p className={styles.btn}>
						{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
					</p>
				</div>
				{isOpen && (
					<div className="text-sm">
						<p className={styles.answer}>{question.answer}</p>
						<div className="m-2 flex justify-around items-center">
							<Link
								className="pt-1 text-blue-200 text-2xl"
								to={`${question.id}`}
							>
								<button > <FaEdit></FaEdit></button>
							</Link>

							
							
							<button className="text-red-300 text-xl" onClick={handleClick}><FaTrash></FaTrash></button>
							

						</div>
					</div>
				)}
			</li>
			<hr className={styles.line} />
		</div>
	)
}

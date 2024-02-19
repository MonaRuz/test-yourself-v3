import { Link, useParams } from "react-router-dom"
import styles from "./Question.module.css"
import Button from "./Button"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { useQuestions } from "../contexts/QuestionsContext"

export default function Question({
	id,
	question,
	answer,
	isOpen,
    dispatch
}) {
	const {category}=useParams()
	const{deleteQuestion}=useQuestions()

	function handleClick(){
		deleteQuestion(category,id)
		
	}
		
	return (
		<div>
			<li>
				<div
					className={styles.questionBox}
					onClick={()=>dispatch({type:"toggleOpen",payload:id})}
				>
					<p className={!isOpen?`${styles.question}`:`${styles.currentQuestion}`}>{question}</p>
					<p className={styles.btn}>
						{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
					</p>
				</div>
				{isOpen && (
					<div>
						<p className={styles.answer}>{answer}</p>
						<div className={styles.btnBox}>
							<Link
								className={styles.link}
								to={`${id}`}
							>
								<Button
									bgColor='var(--main-bg-color)'
									textColor='var(--positive-color)'
								>
									Edit question
								</Button>
							</Link>

							<Button
								bgColor='var(--main-bg-color)'
								textColor='var(--negation-color)'
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

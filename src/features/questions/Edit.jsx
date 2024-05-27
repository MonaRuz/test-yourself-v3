import { useNavigate, useParams } from "react-router-dom"
import styles from "./Edit.module.css"
import Button from "../../UI/Button"
import { useQuestions } from "../../contexts/QuestionsContext"

export default function Edit() {
	const { questions } = useQuestions()
	const { id } = useParams()
	const navigate = useNavigate()

	const selectedQuestion = questions.filter((question) => {
		return question.id === id
	})

	const [{ question, answer }] = selectedQuestion

	return (
		<div className='text-sm'>
			<p className='text-blue-200 m-3'>{question}</p>
			<hr />
			<p className='text-green-200 m-3'>{answer}</p>
			<div className="flex items-center justify-center">
				<button
					className='text-yellow-200 uppercase border border-yellow-200 px-2 py-1 mb-3 w-full'
					onClick={() => navigate(-1)}
				>
					Back
				</button>
			</div>
		</div>
	)
}

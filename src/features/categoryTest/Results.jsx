import { useNavigate, useParams } from "react-router-dom"
import { useQuestions } from "../../contexts/QuestionsContext"

export default function Results() {
	const { result, getQuestions, dispatch } = useQuestions()

	const navigate = useNavigate()
	const { category } = useParams()
	function handleBack() {
		navigate(-1)
	}
	function handleRestart() {
		getQuestions(category)
		dispatch({ type: "restart" })
	}

	return (
		<div>
			<p className="text-blue-200 my-5">Úspěšnost testu : {result}%</p>
			<div className="flex justify-between">
				<button className="text-yellow-200 border border-yellow-200 px-3 py-2" onClick={handleBack}>Back</button>
				<button className="text-yellow-200 border border-yellow-200 px-3 py-2" onClick={handleRestart}>Restart</button>
			</div>
		</div>
	)
}

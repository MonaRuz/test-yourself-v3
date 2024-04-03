import { useNavigate, useParams } from "react-router-dom"
import { useQuestions } from "../../contexts/QuestionsContext"
import Button from "../../components/Button"
import styles from "./Results.module.css"

export default function Results() {
	const { result,getQuestions,dispatch } = useQuestions()
  const navigate=useNavigate()
  const {category}=useParams()
  function handleBack(){
    navigate(-1)
  }
  function handleRestart(){
    getQuestions(category)
    dispatch({type:"restart"})
  }
	return (
		<div>
			<p className={styles.result}>Úspěšnost testu : {result}%</p>
      <Button type="negative" onClick={handleBack}>Back</Button>
      <Button type="confirm" onClick={handleRestart}>Restart</Button>
		</div>
	)
}

import { useQuestions } from "../contexts/QuestionsContext"
import styles from "./Results.module.css"

export default function Results() {
    const{result}=useQuestions()
  return (
    <p className={styles.result}>Úspěšnost testu : {result}%</p>
  )
}

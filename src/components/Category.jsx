import { useNavigate } from "react-router-dom"
import styles from "./Category.module.css"
import Button from "./Button"

export default function Category({
	categoryName,
	numQuestions,
	progress,
	highscore,
	currentScore,
}) {
	const navigate = useNavigate()

	return (
		<div className={styles.category}>
			<h2 className={styles.title}>{categoryName}</h2>
			<p>
				<span className={styles.values}>{numQuestions}</span> questions
			</p>
			<p>
				Progress:{" "}
				<span className={styles.values}>
					{progress} / {numQuestions}
				</span>
			</p>
			<p>
				Current score <span className={styles.values}> {currentScore} </span>%
			</p>
			<p>
				Highscore: <span className={styles.values}>{highscore}</span> %
			</p>
			<div className={styles.buttons}>
				<Button
					type="confirm"
					onClick={() => navigate(`test/${categoryName}`)}
				>
					Test
				</Button>

				<Button
					type="primary"
					onClick={() => navigate(`questions/${categoryName}`)}
				>
					Edit
				</Button>
			</div>
		</div>
	)
}

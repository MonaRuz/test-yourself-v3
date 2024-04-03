import { useNavigate } from "react-router-dom"
import styles from "./Category.module.css"
import Button from "../../UI/Button"

export default function Category({ category }) {
	const navigate = useNavigate()

	return (
		<div className={styles.category}>
			<h2 className={styles.title}>{category.categoryName}</h2>
			<p>
				<span className={styles.values}>{category.numQuestions}</span> questions
			</p>
			<p>
				Progress:{" "}
				<span className={styles.values}>
					{category.progress} / {category.numQuestions}
				</span>
			</p>
			<p>
				Current score{" "}
				<span className={styles.values}> {category.currentScore} </span>%
			</p>
			<p>
				Highscore: <span className={styles.values}>{category.highscore}</span> %
			</p>
			<div className={styles.buttons}>
				<Button
					type='confirm'
					onClick={() => navigate(`/test/${category.categoryName}`)}
				>
					Test
				</Button>

				<Button
					type='primary'
					onClick={() => navigate(`/questions/${category.categoryName}`)}
				>
					Edit
				</Button>
			</div>
		</div>
	)
}

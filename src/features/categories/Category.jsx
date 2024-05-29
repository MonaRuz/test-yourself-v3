import { useNavigate } from "react-router-dom"
import styles from "./Category.module.css"
import Button from "../../UI/Button"

export default function Category({ category }) {
	const navigate = useNavigate()

	return (
		
		
		<div className="text-center p-3 my-2 bg-zinc-700/50 w-full md:w-64">
			<h2 className=" text-pink-200 text-xl uppercase border-b border-pink-200 pb-1">{category.categoryName}</h2>
			<p className="text-blue-200 pt-2">
				<span className={styles.values}>{category.numQuestions}</span> questions
			</p>
			<p className="text-blue-200">
				Progress:{" "}
				<span className={styles.values}>
					{category.progress} / {category.numQuestions}
				</span>
			</p>
			<p className="text-blue-200">
				Current score{" "}
				<span className={styles.values}> {category.currentScore} </span>%
			</p>
			<p className="text-blue-200 mb-3">
				Highscore: <span className={styles.values}>{category.highscore}</span> %
			</p>
			<div className="flex justify-center gap-3">
				<button className="uppercase text-green-200 border border-green-200 py-2 px-3"
					onClick={() => navigate(`test/${category.categoryName}`)}
				>
					Test
				</button>

				<button className="uppercase text-yellow-200 border border-yellow-200 py-2 px-3"
					onClick={() => navigate(`questions/${category.categoryName}`)}
				>
					Edit
				</button>
			</div>
		</div>
		
		
	)
}

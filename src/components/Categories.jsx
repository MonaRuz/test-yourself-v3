import styles from "./Categories.module.css"
import Category from "./Category"
import NewCategory from "./NewCategory"
import Error from "./Error"
import { useQuestions } from "..//contexts/QuestionsContext"
import Loader from "./Loader"

export default function Categories() {
	const { error, categories,isLoading } = useQuestions()

	if(isLoading)return<Loader/>


	return (
		<>
			{error&&<Error>{error}</Error>}
			<hr />
			<p className={styles.instructions}>
				Start test, edit or add questions in existing category, or create new
				category with minimal one question and answer.
			</p>
			<div className={styles.box}>
				<NewCategory />
				{categories.map((category) => (
					<Category
						categoryName={category.categoryName}
						numQuestions={category.numQuestions}
						progress={category.progress}
						highscore={category.highscore}
						currentScore={category.currentScore}
						key={category.id}
					/>
				))}
			</div>
		</>
	)
}

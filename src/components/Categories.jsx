import styles from "./Categories.module.css"
import Category from "./Category"
import NewCategory from "./NewCategory"
import Error from "./Error"
import { useQuestions } from "..//contexts/QuestionsContext"
import Loader from "./Loader"

export default function Categories() {
	const { error, categories,isLoading } = useQuestions()

	if(isLoading)return<Loader/>


	if(error)return<Error>{error}</Error>
	return (
		<>
			<hr />
			<p className={styles.instructions}>
				Start test, edit or add questions in existing category, or create new
				category with minimal one question and answer.
			</p>
			<div className={styles.box}>
				<NewCategory />
				{categories.map((category) => (
					<Category
						category={category}
						key={category.id}
					/>
				))}
			</div>
		</>
	)
}

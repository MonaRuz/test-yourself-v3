import styles from "./Categories.module.css"
import Category from "./Category"
import NewCategory from "./NewCategory"
import { getCategories } from "../../services/testysFakeApi"
import { useLoaderData } from "react-router-dom"
// import Error from "../../UI/Error"
// import { useQuestions } from "../../contexts/QuestionsContext"
// import Loader from "../../UI/Loader"
// import { useEffect } from "react"
// import { loadedCategories } from "./categoriesSlice"
// import { useSelector } from "react-redux"

export default function Categories() {
	const categories=useLoaderData()
	// const categories=useSelector((store)=>store.categories.categories)

	// const { error, isLoading, categories } = useQuestions()

	// useEffect(function () {
	// 	loadedCategories()
	// }, [])

	// if (isLoading) return <Loader />

	// if (error) return <Error>{error}</Error>
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

export async function loader(){
	const categories=getCategories()
	return categories
}

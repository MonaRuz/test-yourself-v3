import styles from "./Categories.module.css"
import Category from "./Category"
import NewCategory from "./NewCategory"
import Error from "../../UI/Error"
import { useQuestions } from "../../contexts/QuestionsContext"
import Loader from "../../UI/Loader"
import { useEffect } from "react"
import { loadedCategories } from "./categoriesSlice"
// import { useSelector } from "react-redux"

export default function Categories() {
	// const categories=useSelector((store)=>store.categories.categories)

	const { error, isLoading,categories } = useQuestions()

	useEffect(function(){
		loadedCategories()
	},[])

	if (isLoading) return <Loader />

	if (error) return <Error>{error}</Error>
	return (
		<>			
			<p className="text-blue-200 text-center py-3">
				Start test, edit or add questions in existing category, or create new
				category with minimal one question and answer.
			</p>
			<NewCategory />
			<h1 className="text-xl text-orange-200 text-center py-2">Your categories:</h1>
			<div className={styles.box}>
				
				
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

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

	const { error, isLoading, categories } = useQuestions()

	useEffect(function () {
		loadedCategories()
	}, [])

	if (isLoading) return <Loader />

	if (error) return <Error>{error}</Error>
	return (
		<>
			<p className='text-blue-200 text-center py-5'>
				Start test, edit or add questions in existing categories, or create
			</p>
			<NewCategory />
			<p className='text-blue-200 text-center py-5'>
				with minimal one question and answer.
			</p>
			<div className='flex flex-col md:grid md:grid-cols-3 md:gap-3 mb-5'>
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

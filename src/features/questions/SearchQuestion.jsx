import styles from "./SearchQuestion.module.css"
import { IoIosSearch } from "react-icons/io";

export default function SearchQuestion({ dispatch }) {
	return (
		<form className={styles.form}>
			<div>
				<input
					type='text'
					placeholder='Search in questions and answers'
					className="placeholder:text-sm placeholder:text-center bg-inherit border border-green-200 w-full my-3"
					onChange={(e) => dispatch({type:"setSearchQuery",payload:e.target.value})}
				/>
			</div>
		</form>
	)
}

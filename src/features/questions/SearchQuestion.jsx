import styles from "./SearchQuestion.module.css"
import { IoIosSearch } from "react-icons/io";

export default function SearchQuestion({ dispatch }) {
	return (
		<form className="sm:m-auto sm:w-3/5">
			<div>
				<input
					type='text'
					placeholder='Search in questions and answers'
					className="placeholder:text-xs placeholder:text-center bg-inherit border border-green-200 w-full my-3 py-1 text-sm text-blue-200"
					onChange={(e) => dispatch({type:"setSearchQuery",payload:e.target.value})}
				/>
			</div>
		</form>
	)
}

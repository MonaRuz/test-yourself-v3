import styles from "./SearchQuestion.module.css"
import { IoIosSearch } from "react-icons/io";

export default function SearchQuestion({ dispatch }) {
	return (
		<form className={styles.form}>
			<div className={styles.formBox}>
				<div className={styles.searchIcon}>
					<IoIosSearch />
				</div>
				<input
					type='text'
					placeholder='Search in questions and answers'
					className={styles.input}
					onChange={(e) => dispatch({type:"setSearchQuery",payload:e.target.value})}
				/>
			</div>
		</form>
	)
}

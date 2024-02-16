import { Link } from "react-router-dom"
import styles from "./Logo.module.css"

export default function Logo() {
	return (
		<Link to='/'>
			<img className={styles.logo}
				src='/src/assets/TestYS.png'
				alt='testys logo'
			/>
		</Link>
	)
}

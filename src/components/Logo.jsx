import { Link } from "react-router-dom"
import styles from "./Logo.module.css"

export default function Logo() {
	return (
		<Link className={styles.logoBox}  to='/'>
			<h1 className={styles.logo}>TestYS</h1>
			<p className={styles.logoText}>test yourself!</p>
		</Link>
	)
}

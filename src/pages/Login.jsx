import PageNav from "../components/PageNav"
import styles from "./Login.module.css"

export default function Login() {
	return (
		<div className={styles.login}>
			<PageNav/>
			<p>Login</p>
		</div>
	)
}

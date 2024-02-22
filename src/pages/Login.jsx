import Button from "../components/Button"
import PageNav from "../components/PageNav"
import styles from "./Login.module.css"

export default function Login() {
	return (
		<div className={styles.login}>
			<PageNav />
			<hr />
			<form className={styles.form}>
				<label
					className={styles.label}
					htmlFor='email'
				>
					email:
				</label>
				<input
					className={styles.input}
					type='text'
					id='email'
				/>
				<label
					className={styles.label}
					htmlFor='password'
				>
					password:
				</label>
				<input
					className={styles.input}
					type='text'
					id='password'
				/>
				<Button
					type="login"
				>
					Login
				</Button>
			</form>
		</div>
	)
}

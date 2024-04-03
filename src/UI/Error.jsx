import styles from "./Error.module.css"

export default function Error({ children }) {
	return (
		<div className={styles.error}>
			<p className={styles.errorMessage}>{children}</p>
		</div>
	)
}

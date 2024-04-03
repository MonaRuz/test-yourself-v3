import styles from "./Intro.module.css"

export default function Intro() {
	return (
		<div className={styles.intro}>
			<p className={styles.introText}>
				Practice your knowledge in any field!<br/> Whether you're a student or
				self-taught, write your own questions and answers and rate your
				performance.
			</p>
		</div>
	)
}

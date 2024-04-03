import { useNavigate } from "react-router-dom"
import Button from "./Button"
import Intro from "./Intro"
import PageNav from "./PageNav"
import styles from "./Homepage.module.css"

export default function Homepage() {
	const navigate = useNavigate()

	function handleClick() {
		navigate("/login")
	}
	return (
		<div>
			<PageNav />
			<Intro />
			<div className={styles.intro}>
				<Button
					type='confirm'
					onClick={handleClick}
				>
					To the app
				</Button>
			</div>
		</div>
	)
}

import { useNavigate } from "react-router-dom"
import Button from "../UI/Button"
import Intro from "../UI/Intro"
import PageNav from "../UI/PageNav"
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

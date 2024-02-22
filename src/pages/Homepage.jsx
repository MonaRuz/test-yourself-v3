import { NavLink } from "react-router-dom"
import Button from "../components/Button"
import Intro from "../components/Intro"
import PageNav from "../components/PageNav"
import styles from "./Homepage.module.css"

export default function Homepage() {
	return (
		<div>
			<PageNav />
			<Intro/>
			<NavLink to="app" className={styles.btn}>
				<Button
					type="confirm"
				>
					To the app
				</Button>
			</NavLink>
		</div>
	)
}

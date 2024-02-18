import { useNavigate } from "react-router-dom"
import Logo from "./Logo"
import styles from "./PageNav.module.css"
import Button from "./Button"

export default function PageNav() {
	const navigate=useNavigate()
	return (
		<nav>
			<ul className={styles.nav}>
				<li>
					<Logo />
				</li>
				
				<li>
						<Button
							textColor='var(--menu-color)'
							bgColor='var(--main-bg-color)'
							onClick={()=>navigate("login")}
						>
							Login
						</Button>
				</li>
			</ul>
		</nav>
	)
}

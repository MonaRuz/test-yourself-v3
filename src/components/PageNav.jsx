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
							type="login"
							onClick={()=>navigate("login")}
						>
							Login
						</Button>
				</li>
			</ul>
		</nav>
	)
}

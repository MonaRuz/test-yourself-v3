import { useNavigate } from "react-router-dom"
import Logo from "./Logo"
import styles from "./PageNav.module.css"
import Button from "./Button"
import { useAuth } from "../contexts/FakeAuthContext"
import User from "./User"

export default function PageNav() {
	const{isAuthenticated}=useAuth()
	const navigate=useNavigate()
	return (
		<nav>
			<ul className={styles.nav}>
				<li>
					<Logo />
				</li>
				
				<li>
						{!isAuthenticated&&<Button
							type="login"
							onClick={()=>navigate("/login")}
						>
							Login
						</Button>}
						{isAuthenticated&&<User/>}
				</li>
			</ul>
		</nav>
	)
}

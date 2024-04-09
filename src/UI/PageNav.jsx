import { useNavigate } from "react-router-dom"
import Logo from "./Logo"
import styles from "./PageNav.module.css"
import Button from "./Button"
import User from "../features/fakeAuth/User"
import { useSelector } from "react-redux"

export default function PageNav() {
	const isAuthenticated=useSelector((store)=>store.authenticate.isAuthenticated)
	const navigate=useNavigate()
	return (
		<nav>
			<ul className="flex flex-col items-center">
				<li>
					<Logo />
				</li>
				
				<li className="flex flex-grow">
						{!isAuthenticated&&<Button
							type="confirm"
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

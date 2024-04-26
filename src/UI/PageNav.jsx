import { useNavigate, useSearchParams } from "react-router-dom"
import Logo from "./Logo"
import Button from "./Button"
import User from "../features/fakeAuth/User"
import { useSelector } from "react-redux"

export default function PageNav() {
	const isAuthenticated = useSelector(
		(store) => store.authenticate.isAuthenticated
	)
	const navigate = useNavigate()
	const isLogging = useSearchParams()
	return (
		<nav>
			<ul className='flex flex-col items-center justify-between'>
				<li>
					<Logo />
				</li>

				<li>
					{!isAuthenticated && !isLogging && (
						<Button
							type='confirm'
							onClick={() => navigate("/login")}
						>
							Login
						</Button>
					)}
					<User />
				</li>
			</ul>
		</nav>
	)
}

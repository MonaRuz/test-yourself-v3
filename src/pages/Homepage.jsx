import { useNavigate } from "react-router-dom"
import Button from "../UI/Button"
import Intro from "../UI/Intro"
import Logo from "../UI/Logo"

export default function Homepage() {
	const navigate = useNavigate()

	function handleClick() {
		navigate("/login")
	}
	return (
		<div className='flex flex-col items-center justify-around h-dvh'>
			<Logo />
			<Intro />
			<Button
				type='confirm'
				onClick={handleClick}
			>
				To the app
			</Button>
		</div>
	)
}

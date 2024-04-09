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
			<div className="text-4xl flex">
				<div className="text-green-200">✔</div>
				<div className="text-red-200">✘</div>
			</div>
			<Button
				type='confirm'
				onClick={handleClick}
			>
				To the app
			</Button>
		</div>
	)
}

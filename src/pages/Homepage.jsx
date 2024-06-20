import { useNavigate } from "react-router-dom"
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
			<button className="text-green-200 border border-green-200 px-3 py-2"
				onClick={handleClick}
			>
				To the app
			</button>
		</div>
	)
}

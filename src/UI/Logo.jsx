import { Link } from "react-router-dom"

export default function Logo() {

	return (
		<Link to='/'>
			<h1 className="text-green-200 text-5xl">TestYS</h1>
			<p className="text-red-200 italic text-center">test yourself!</p>
		</Link>
	)
}

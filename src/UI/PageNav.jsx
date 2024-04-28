"react-router-dom"
import Logo from "./Logo"

import User from "../features/fakeAuth/User"


export default function PageNav() {
	

	return (
		<nav className="w-full">
			<ul className='flex flex-col items-center justify-between border-b pb-2'>
				<li>
					<Logo />
				</li>

				<li>
					
					<User />
				</li>
			</ul>
		</nav>
	)
}

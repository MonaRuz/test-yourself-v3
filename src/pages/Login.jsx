import { useNavigate } from "react-router-dom"
import PageNav from "../UI/PageNav"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../features/fakeAuth/fakeAuthSlice"

const FAKE_USER = {
	name: "Monika",
	email: "monika@email.cz",
	password: "heslo1",
}

export default function Login() {
	const [email, setEmail] = useState("monika@email.cz")
	const [password, setPassword] = useState("heslo1")
	const [name, setName] = useState("")
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isAuthenticated = useSelector(
		(store) => store.authenticate.isAuthenticated
	)

	function handleLogin(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password)
			dispatch(login(FAKE_USER))
	}

	function handleSubmit(e) {
		e.preventDefault()
		if (name) return
		if ((email, password)) handleLogin(email, password)
	}

	useEffect(function () {
		if (isAuthenticated) navigate("/app", { replace: true })
	})

	return (
		<div className='h-dvh flex flex-col'>
			<div className='mt-12'>
				<PageNav />
			</div>
			<form className='flex flex-col my-auto sm:items-center'>
				<label
					className='text-blue-200 text-center my-2'
					htmlFor='email'
				>
					email:
				</label>
				<input
					className='h-8 bg-zinc-900 text-blue-200 border border-zinc-700 text-center mb-2'
					type='text'
					id='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label
					className='text-blue-200 text-center my-2'
					htmlFor='password'
				>
					password:
				</label>
				<input
					className='h-8 bg-zinc-900 text-blue-200 border border-zinc-700 text-center mb-12'
					type='text'
					id='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					className='hidden'
					type='text'
					id='name'
					onChange={(e) => setName(e.target.value)}
				/>
				<button
					className="text-green-200 border border-green-200 px-3 py-2"
					onClick={handleSubmit}
				>
					Login
				</button>
			</form>
		</div>
	)
}

import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import PageNav from "../components/PageNav"
import styles from "./Login.module.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../features/fakeAuth/fakeAuthSlice"

const FAKE_USER={
    name:"Monika",
    email:"monika@email.cz",
    password:"heslo1",
}

export default function Login() {
	const[email,setEmail]=useState("monika@email.cz")
	const[password,setPassword]=useState("heslo1")
	const[name,setName]=useState("")
	const navigate=useNavigate()
	const dispatch=useDispatch()
	const isAuthenticated=useSelector((store)=>store.authenticate.isAuthenticated)

	function handleLogin(email,password){
        if(email===FAKE_USER.email && password===FAKE_USER.password)dispatch(login(FAKE_USER))
    }

	function handleSubmit(e){
		e.preventDefault()
		if(name)return
		if(email,password)handleLogin(email,password)
	}

	useEffect(function(){
		if(isAuthenticated)navigate("/app",{replace:true})
	})

	return (
		<div className={styles.login}>
			<PageNav />
			<hr />
			<form className={styles.form}>
				<label
					className={styles.label}
					htmlFor='email'
				>
					email:
				</label>
				<input
					className={styles.input}
					type='text'
					id='email'
					value={email}
					onChange={(e)=>setEmail(e.target.value)}
				/>
				<label
					className={styles.label}
					htmlFor='password'
				>
					password:
				</label>
				<input
					className={styles.input}
					type='text'
					id='password'
					value={password}
					onChange={(e)=>setPassword(e.target.value)}
				/>
				{/* honeyPot */}
				<input
					className={styles.honeyPot}
					type='text'
					id='name'
					onChange={(e)=>setName(e.target.value)}
				/>
				<Button
					type="login"
					onClick={handleSubmit}
				>
					Login
				</Button>
			</form>
		</div>
	)
}

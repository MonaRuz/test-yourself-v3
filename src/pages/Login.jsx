import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import PageNav from "../components/PageNav"
import { useAuth } from "../contexts/FakeAuthContext"
import styles from "./Login.module.css"
import { useEffect, useState } from "react"

export default function Login() {
	const[email,setEmail]=useState("monika@email.cz")
	const[password,setPassword]=useState("heslo1")
	const{isAuthenticated,login}=useAuth()
	const navigate=useNavigate()

	function handleSubmit(e){
		e.preventDefault()
		if(email,password)login(email,password)
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

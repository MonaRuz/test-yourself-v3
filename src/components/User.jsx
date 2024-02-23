import { useAuth } from "../contexts/FakeAuthContext"
import Button from "./Button"
import { FaRegCircleUser } from "react-icons/fa6"
import styles from "./User.module.css"
import { useNavigate } from "react-router-dom"

export default function User() {
	const { user, logout } = useAuth()
	const navigate = useNavigate()

	function handleClick() {
		logout()
		navigate("/")
	}

	return (
		<div className={styles.user}>
			<FaRegCircleUser className={styles.icon} />
			<h3 className={styles.name}>{user.name}</h3>
			<Button
				type='logout'
				onClick={handleClick}
			>
				Logout
			</Button>
		</div>
	)
}

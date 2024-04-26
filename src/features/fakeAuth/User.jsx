
import Button from "../../UI/Button"
import { FaRegCircleUser } from "react-icons/fa6"
import styles from "./User.module.css"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "./fakeAuthSlice"

export default function User() {
	const navigate = useNavigate()
	const dispatch=useDispatch()
	const user=useSelector((store)=>store.authenticate.user)
	

	function handleClick() {
		dispatch(logout())
		navigate("/")
	}

	return (
		<div>
			{user&&
				<>
					<FaRegCircleUser className={styles.icon} />
			<h3 className={styles.name}>{user?.name}</h3>
			<Button
				type='negative'
				onClick={handleClick}
			>
				Logout
			</Button>
				</>
				
			}
		</div>
	)
}

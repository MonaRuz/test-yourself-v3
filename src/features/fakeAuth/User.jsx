
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
		<div className="my-3 flex flex-wrap items-center justify-center gap-1">
			{user&&
				<>
					<FaRegCircleUser className="text-green-200 text-[20px]" />
			<h3 className={styles.name}>{user?.name}</h3>
			<button
				className='text-sm text-red-200 border border-red-200 p-2 ml-4'
				onClick={handleClick}
			>
				Logout
			</button>
				</>
				
			}
		</div>
	)
}

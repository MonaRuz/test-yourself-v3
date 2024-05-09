import Button from "../../UI/Button"
import { FaRegCircleUser } from "react-icons/fa6"
import styles from "./User.module.css"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "./fakeAuthSlice"

export default function User() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelector((store) => store.authenticate.user)

	function handleClick() {
		dispatch(logout())
		navigate("/")
	}

	return (
		<div className='my-3'>
			{user && (
				<>
					<div className='flex items-center gap-3'>
						<div className="flex items-center">
							<FaRegCircleUser className='text-green-200 text-[20px]' />
							<h3 className={styles.name}>{user?.name}</h3>
						</div>

						<button
							className=' text-red-200 border border-red-200 w-full py-1 px-4'
							onClick={handleClick}
						>
							Logout
						</button>
					</div>
				</>
			)}
		</div>
	)
}

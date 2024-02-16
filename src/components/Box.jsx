import styles from "./Box.module.css"
import { Outlet } from "react-router-dom"

export default function Box() {
	return (
		<div className={styles.box}>
			<Outlet />
		</div>
	)
}

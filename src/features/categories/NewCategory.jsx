import { useNavigate } from "react-router-dom"
import styles from "./NewCategory.module.css"
import Button from "../../components/Button"

export default function NewCategory() {
	const navigate = useNavigate()
	return (
		<div className={styles.newCategory}>
			<h2 className={styles.title}>Add new category</h2>
			<Button
				textColor='var(--menu-color)'
				bgColor='var(--main-bg-color)'
				childrenSize={20}
				onClick={() => navigate("new-category")}
			>
				+
			</Button>
		</div>
	)
}

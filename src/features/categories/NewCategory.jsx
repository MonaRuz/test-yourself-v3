import { useNavigate } from "react-router-dom"

export default function NewCategory() {
	const navigate = useNavigate()
	return (
		<div className="flex justify-center border border-green-200 text-green-200">
			<button 
				className="text-green-200 uppercase p-2"
				onClick={() => navigate("new-category")}
			>
				New category
			</button>
		</div>
	)
}

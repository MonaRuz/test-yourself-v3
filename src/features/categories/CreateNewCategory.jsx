import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CreateNewCategory() {
	const [newCategoryName, setNewCategoryName] = useState("")
	const [newDescription, setNewDescription] = useState("")

	const navigate = useNavigate()

	function handleSubmit(e) {
		e.preventDefault()

		if (newDescription) return
		if (newCategoryName) {
			console.log("test")
			navigate("/app/categories")
		} else alert("this fiel must be filled!")
	}

	return (
		<div className='text-blue-200 text-center'>
			<p className='text-sm pt-2 md:text-base'>
				Input name of your new category.
			</p>
			<form onSubmit={handleSubmit}>
				<label>
					<p className='text-orange-200 py-2'>Category name:</p>
					<input
						value={newCategoryName}
						onChange={(e) => setNewCategoryName(e.target.value)}
						className='bg-zinc-800 border border-yellow-200 w-full h-9'
						type='text'
					></input>
				</label>
				<label className='hidden'>
					<p>Description:</p>
					<input
						value={newDescription}
						onChange={(e) => setNewDescription(e.target.value)}
						type='text'
					></input>
				</label>

				<div className='flex justify-between gap-2  w-full my-5'>
					<button
						type='button'
						onClick={() => navigate("/app/categories")}
						className='uppercase text-red-200 border border-red-200  py-2 px-3 my-2 hover:bg-red-200 hover:text-zinc-900'
					>
						Back
					</button>
					<button
						type='submit'
						className='uppercase text-green-200 border border-green-200 py-2 px-3 my-2 hover:bg-green-200 hover:text-zinc-900'
					>
						Create new category
					</button>
				</div>
			</form>
		</div>
	)
}

import { useState } from "react"
import { projectFirestore } from "../firebase/config"

const StartPage = () => {

	const [categoryName,setCategoryName]=useState("")
	const [error,setError]=useState(false)

	const submitForm=(async(e)=>{
		e.preventDefault()
		//save state into object
		const newCategory={category:categoryName}
		//sending object to database
		try{
			await projectFirestore.collection("categories").add(newCategory)
			//Delete input field
			setCategoryName("")
		}catch(err){
			setError("Kategorii se nepodařilo přidat."+err.message)
		}
	})


	return (
		<div className='content'>
			
			<div>
				<form onSubmit={submitForm} className='form-wrapper'>
					<label
						htmlFor='category-field'
						className='label'
					>
						Zadejte název nové kategorie nebo vyberte kategorii vlevo
					</label>
					<input
						onChange={(e)=>setCategoryName(e.target.value)}
						type='text'
						id='category-field'
						placeholder="Název kategorie"
						value={categoryName}
					/>
					<input
						type='submit'
						value='Přidat kategorii'
					/>
				</form>
			</div>
		</div>
	)
}

export default StartPage

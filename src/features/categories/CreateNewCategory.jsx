import { useState } from "react"

export default function CreateNewCategory() {

  const[newCategoryName,setNewCategoryName]=useState("")
  const[newCategoryQuestion,setNewCategoryQuestion]=useState("")
  const[newCategoryAnswer,setNewCategoryAnswer]=useState("")

  function handleSubmit(e){
    e.preventDefault()


    setNewCategoryName("")
    setNewCategoryQuestion("")
    setNewCategoryAnswer("")
  }

	return (
		<div className='text-blue-200 text-center'>
			<p className="text-sm pt-2">
				Input name of your new category and your first question and answer in
				this category.
			</p>
			<form onSubmit={handleSubmit}>
				<label>
					<p className="text-orange-200 py-2">Category name:</p>
					<input
            value={newCategoryName}
            onChange={(e)=>setNewCategoryName(e.target.value)}
						className='bg-zinc-800 border border-yellow-200 w-full'
						type='text'
					></input>
				</label>
				<label>
					<p className="text-orange-200 py-2">Your first question:</p>
					<textarea
          value={newCategoryQuestion}
          onChange={(e)=>setNewCategoryQuestion(e.target.value)}
						className='bg-zinc-800 border border-yellow-200 w-full'

	
					></textarea>
				</label>
				<label>
					<p className="text-orange-200 py-2">Your first answer:</p>
					<textarea
          value={newCategoryAnswer}
          onChange={(e)=>setNewCategoryAnswer(e.target.value)}
						className='bg-zinc-800 border border-yellow-200 w-full'
					></textarea>
				</label>
        <button className="uppercase text-green-200 border border-green-200 w-full py-2 my-2 hover:bg-green-200 hover:text-zinc-900">Create new category</button>
			</form>
		</div>
	)
}

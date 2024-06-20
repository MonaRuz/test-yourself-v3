export default function CreateNewCategory() {
	return (
		<div className='text-blue-200 text-center'>
			<p className="text-sm pt-2">
				Input name of your new category and your first question and answer in
				this category.
			</p>
			<form>
				<label>
					<p className="text-orange-200 py-2">Category name:</p>
					<input
						className='bg-zinc-800 border border-yellow-200 w-full'
						type='text'
					></input>
				</label>
				<label>
					<p className="text-orange-200 py-2">Your first question:</p>
					<textarea
						className='bg-zinc-800 border border-yellow-200 w-full'

	
					></textarea>
				</label>
				<label>
					<p className="text-orange-200 py-2">Your first answer:</p>
					<textarea
						className='bg-zinc-800 border border-yellow-200 w-full'
					></textarea>
				</label>
        <button className="uppercase text-green-200 border border-green-200 w-full py-2 my-2">Create new category</button>
			</form>
		</div>
	)
}

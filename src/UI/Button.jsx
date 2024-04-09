

export default function Button({ onClick, children, type }) {
	const base="text-lg px-2 py-1  sm:p-3 sm:m-4 min-w-full bg-zinc-800 cursor-poiter border hover:text-zinc-800 hover:border-zinc-800 font-bold"

	const styles={
		primary: base + "text-lg text-orange-200 hover:bg-orange-200 border-orange-200 ",
		confirm: base + "text-lg text-green-200 hover:bg-green-200 border-green-200",
		negative: base+ "text-lg text-red-200 hover:bg-red-200 border-red-200",
	}
	return (
		<button
			className={styles[type]}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

import PageNav from "./PageNav"
import Box from "./Box"


export default function AppLayout() {
	
	return (
		<div className="flex flex-col items-center justify-around">
			<PageNav/>
			<Box/>
		</div>
	)
}

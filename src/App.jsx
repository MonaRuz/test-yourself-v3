import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QuestionsProvider } from "./contexts/QuestionsContext"
import Test from "./features/categoryTest/Test"
import PageNotFound from "./UI/PageNotFound"
import Categories from "./features/categories/Categories"
import Questions from "./features/questions/Questions"
import CreateNewCategory from "./features/categories/CreateNewCategory"
import Edit from "./features/questions/Edit"
import NewQuestion from "./features/questions/NewQuestion"
import ProtectedRoute from "./features/fakeAuth/ProtectedRoute"
import { Suspense, lazy } from "react"
import Loader from "./UI/Loader"

const Homepage = lazy(() => import("./UI/Homepage"))
const Login = lazy(() => import("./features/fakeAuth/Login"))
const AppLayout = lazy(() => import("./UI/AppLayout"))

export default function App() {
	return (
		<QuestionsProvider>
			<BrowserRouter>
				<Suspense fallback={<Loader />}>
					<Routes>
						<Route
							index
							element={<Homepage />}
						/>
						<Route
							path='/'
							element={<Homepage />}
						/>
						<Route
							path='login'
							element={<Login />}
						/>

						<Route
							path='app'
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route
								index
								element={<Categories />}
							/>
							<Route
								path='categories'
								element={<Categories />}
							/>
							<Route
								path='test/:category'
								element={<Test />}
							/>
							<Route
								path='questions/:category'
								element={<Questions />}
							/>
							<Route
								path='questions/:category/new-question'
								element={<NewQuestion />}
							/>
							<Route
								path='questions/:category/:id'
								element={<Edit />}
							/>
							<Route
								path='new-category'
								element={<CreateNewCategory />}
							/>
						</Route>
						<Route
							path='*'
							element={<PageNotFound />}
						/>
					</Routes>
				</Suspense>
			</BrowserRouter>
		</QuestionsProvider>
	)
}

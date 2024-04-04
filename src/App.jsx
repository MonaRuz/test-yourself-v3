import {
	RouterProvider,
	// Routes,
	createBrowserRouter,
} from "react-router-dom"
// import { QuestionsProvider } from "./contexts/QuestionsContext"
import Test from "./features/categoryTest/Test"
// import PageNotFound from "./UI/PageNotFound"
import Categories, {
	loader as categoriesLoader,
} from "./features/categories/Categories"
import Questions, {
	loader as questionsLoader,
} from "./features/questions/Questions"
import CreateNewCategory from "./features/categories/CreateNewCategory"
import Edit from "./features/questions/Edit"
import NewQuestion,{action as newQuestionAction} from "./features/questions/NewQuestion"
import ProtectedRoute from "./features/fakeAuth/ProtectedRoute"
// import Loader from "./UI/Loader"
// import Error from "./UI/Error"
import Homepage from "./UI/Homepage"
import Login from "./features/fakeAuth/Login"
import AppLayout from "./UI/AppLayout"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Homepage />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		element: (
			<ProtectedRoute>
				<AppLayout />
			</ProtectedRoute>
		),
		children: [
			{
				path: "/categories",
				element: <Categories />,
				loader: categoriesLoader,
			},
			{
				path: "/test/:category",
				element: <Test />,
			},
			{
				path: "/questions/:category",
				element: <Questions />,
				loader: questionsLoader,
			},
			{
				path: "/questions/:category/new-question",
				element: <NewQuestion />,
				action:newQuestionAction
			},
			{
				path: "/questions/:category/:id",
				element: <Edit />,
			},
			{
				path: "/new-category",
				element: <CreateNewCategory />,
			},
		],
	},
])

export default function App() {
	return <RouterProvider router={router} />
	// <QuestionsProvider>
	// 	<BrowserRouter>
	// 		<Suspense fallback={<Loader />}>
	// 			<Routes>
	// 				<Route
	// 					index
	// 					element={<Homepage />}
	// 				/>
	// 				<Route
	// 					path='/'
	// 					element={<Homepage />}
	// 				/>
	// 				<Route
	// 					path='login'
	// 					element={<Login />}
	// 				/>

	// 				<Route
	// 					path='app'
	// 					element={
	// 						<ProtectedRoute>
	// 							<AppLayout />
	// 						</ProtectedRoute>
	// 					}
	// 				>
	// 					<Route
	// 						index
	// 						element={<Categories />}
	// 					/>
	// 					<Route
	// 						path='categories'
	// 						element={<Categories />}
	// 					/>
	// 					<Route
	// 						path='test/:category'
	// 						element={<Test />}
	// 					/>
	// 					<Route
	// 						path='questions/:category'
	// 						element={<Questions />}
	// 					/>
	// 					<Route
	// 						path='questions/:category/new-question'
	// 						element={<NewQuestion />}
	// 					/>
	// 					<Route
	// 						path='questions/:category/:id'
	// 						element={<Edit />}
	// 					/>
	// 					<Route
	// 						path='new-category'
	// 						element={<CreateNewCategory />}
	// 					/>
	// 				</Route>
	// 				<Route
	// 					path='*'
	// 					element={<PageNotFound />}
	// 				/>
	// 			</Routes>
	// 		</Suspense>
	// 	</BrowserRouter>
	// </QuestionsProvider>
}

import {BrowserRouter,Routes, Route} from "react-router-dom"
import StartPage from "./pages/StartPage"
import Questions from "./pages/Questions"
import Test from "./pages/Test"
import Error from "./pages/Error"
import SharedLayout from "./pages/SharedLayout"



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout/>}>
          <Route index element={<StartPage/>}/>
          <Route path="/questions/:categoryId" element={<Questions/>}/>
          <Route path="/test/:categoryId" element={<Test/>}/>
          <Route path="*" element={<Error/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

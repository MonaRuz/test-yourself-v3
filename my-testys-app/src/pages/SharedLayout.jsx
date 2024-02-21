import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/sidebar"
import Footer from "../components/Footer"
import "./SharedLayout.css"

const SharedLayout = () => {
  return (
    <div className="layout">
        <Header className="full-width"/>
        <div className="content-wrapper">
            <Sidebar className="side-by-side"/>
            <Outlet className="side-by-side"/>
        </div>
        <Footer className="full-width"/>
    </div>
  )
}

export default SharedLayout
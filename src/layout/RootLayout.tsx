import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
const RootLayout = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <main className="flex-grow pt-20">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}

export default RootLayout
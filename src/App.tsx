
import Footer from "./layout/Footer"
import Navbar from "./layout/Navbar"
import Dashboard from "./pages/Dashboard"
const App = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Dashboard />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App

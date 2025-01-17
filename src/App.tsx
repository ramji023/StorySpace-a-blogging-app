import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import RootLayout from "./layout/RootLayout"
import AccountDetails from "./pages/AccountDetails"
import WriteStory from "./pages/WriteStory"
import WatchStory from "./pages/WatchStory"
import SignUp from "./pages/auth/Signup"
import Loading from "./components/loading"
import { AuthProvider } from "./context/auth/AuthContext"
import Error from "./components/Error"
const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<AccountDetails />} />
              <Route path="write-story" element={<WriteStory />} />
              <Route path="watch-story" element={<WatchStory />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="loading" element={<Loading text="wait for some seconds..."/>} />
           <Route path="error" element={<Error/>}/>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}
export default App

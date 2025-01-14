import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import RootLayout from "./layout/RootLayout"
import AccountDetails from "./pages/AccountDetails"
import WriteStory from "./pages/WriteStory"
import WatchStory from "./pages/WatchStory"
import SignUp from "./pages/auth/Signup"
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<AccountDetails />} />
            <Route path="write-story" element={<WriteStory />} />
            <Route path="watch-story" element={<WatchStory/>} /> 
            <Route path="signup" element={<SignUp/>} />   
          </Route>
        </Routes>
      </Router>
    </>
  )
}
export default App

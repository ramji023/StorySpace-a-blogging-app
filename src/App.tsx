import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import RootLayout from "./layout/RootLayout"
import AccountDetails from "./pages/AccountDetails"
import WriteStory from "./pages/WriteStory"
import WatchStory from "./pages/WatchStory"
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
          </Route>
        </Routes>
      </Router>
    </>
  )
}
export default App

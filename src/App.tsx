import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import RootLayout from "./layout/RootLayout"
import AccountDetails from "./pages/AccountDetails"
import WriteStory from "./pages/WriteStory"
import WatchStory from "./pages/WatchStory"
import SignUp from "./pages/auth/Signup"
import { AuthProvider } from "./context/auth/AuthContext"
import Error from "./components/Error"
import UserBlogList from "./pages/Account_page/UserBlogList"
import SavedBlogs from "./pages/Account_page/SavedBlogs"
import About from "./pages/Account_page/About"
import Growth from "./pages/Account_page/Growth"
const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="yourProfile" element={<AccountDetails />}>
                <Route index element={<UserBlogList />} />
                <Route path="blogs" element={<UserBlogList/>}/>
                <Route path="saved" element={<SavedBlogs />} />
                <Route path="about" element={<About />} />
                <Route path="growth" element={<Growth />} />
              </Route>
              <Route path="write-story" element={<WriteStory />} />
              <Route path="watchStory/:storyId" element={<WatchStory />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="error" element={<Error />} />
            </Route>
            
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}
export default App

import { Routes,Route } from "react-router-dom";
import AccountHeader from "../components/Account_details/AccountHeader"
import AccountNav from "../components/Account_details/AccountNav"
import UserBlogList from "./Account_page/UserBlogList";
import SavedBlogs from "./Account_page/SavedBlogs";
import About from "./Account_page/About";
import Growth from "./Account_page/Growth";
const AccountDetails = () => {
    const user = {
        name: 'Sarah Wilson',
        bio: 'Tech writer & Software Engineer | Passionate about web development and creative writing',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    };
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Left Column - Navigation and Content */}
                    <div className="flex-1">
                        <AccountNav />
                        <Routes>
                            <Route path="/" element={<UserBlogList />} />
                            <Route path="/blogs" element={<UserBlogList />} />
                            <Route path="/saved" element={<SavedBlogs />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/growth" element={<Growth />} />
                        </Routes>
                    </div>

                    {/* Right Column - Profile Info */}
                    <div className="w-80 shrink-0">
                        <div className="sticky top-24">
                            <AccountHeader {...user} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountDetails
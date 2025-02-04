import { Link } from 'react-router-dom';
import { Search, PenSquare, User } from 'lucide-react';
import { AuthContext } from '../context/auth/AuthContext';
import { useContext, memo } from 'react';
const Navbar = () => {
    console.log("navbar component renders...") // call navbar component
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext must be used within an AuthProvider.")
    }
    const { user } = context;
    return (
        <>
            <nav className="bg-white shadow-md px-4 py-3 fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-2">
                       <Link to="/">
                       <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                                StorySpace
                            </span>
                       </Link>           
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl mx-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search stories..."
                                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 pl-10"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-6">
                        <Link to="write-story" className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors ">
                            <PenSquare className="h-5 w-5" />
                            <span>Write</span>
                        </Link>

                        <div className="flex items-center space-x-4">
                            {user?.isAuthenticated ? (<Link to="yourProfile" className="text-gray-700 hover:text-purple-600">
                                <User className="h-6 w-6" />
                            </Link>) : (<Link to="signup" className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors">
                                SignUp/Login
                            </Link>)}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default memo(Navbar); 
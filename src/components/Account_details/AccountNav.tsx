import { NavLink } from "react-router-dom"
import { FileText, BookMarked, User, TrendingUp } from "lucide-react";

interface NavItem {
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    path: string;
}

const navItems: Array<NavItem> = [
    { label: 'My Blogs', icon: FileText, path: '/profile' },
    { label: 'Saved', icon: BookMarked, path: '/profile/saved' },
    { label: 'About', icon: User, path: '/profile/about' },
    { label: 'Growth', icon: TrendingUp, path: '/profile/growth' },
];
const AccountNav = () => {
    return (
        <>
            <nav className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <ul className="flex space-x-4">
                    {navItems.map((item) => (
                        <li key={item.path} className="flex-1">
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${isActive
                                        ? 'bg-purple-50 text-purple-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`
                                }
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

export default AccountNav
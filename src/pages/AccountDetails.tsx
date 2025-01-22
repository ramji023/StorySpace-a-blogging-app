import { Outlet } from "react-router-dom";
import AccountHeader from "../components/Account_details/AccountHeader"
import AccountNav from "../components/Account_details/AccountNav"
const AccountDetails = () => {
   
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Left Column - Navigation and Content */}
                    <div className="flex-1">
                        <AccountNav />
                        <Outlet />
                    </div>

                    {/* Right Column - Profile Info */}
                    <div className="w-80 shrink-0">
                        <div className="sticky top-24">
                            <AccountHeader />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountDetails
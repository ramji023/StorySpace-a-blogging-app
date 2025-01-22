import { LogOut, Upload } from "lucide-react";
import { AuthContext } from "../../context/auth/AuthContext";
import { useContext, useState } from "react";
import ProfileBox from "../ProfileBox";

// https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop 


const AccountHeader = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext must be used within an AuthProvider.");
    }
    const { user, setUser } = context;
    console.log("user data in accountHeader : ", user);

    const [isEditing, setIsEditing] = useState(false);
    //open model
    function openProfileBox() {
        setIsEditing(true);
    }
    // close model
    function closeProfileBox() {
        setIsEditing(false);
    }

    const profileBoxData = {
        bio: user.bio,
        UserLocation: user.UserLocation,
        company: user.company,
        website: user.website,
        socialLinks: {
            linkedin: user.socialLinks?.linkedin,
            twitter: user.socialLinks?.twitter,
        }
    }
    return (
        <>
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img
                            src={user.profileImage || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop'}
                            alt={user.username}
                            className="w-32 h-32 rounded-full object-cover mb-4"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute bottom-0 right-0 p-1 bg-white rounded-full border-2 border-gray-600 cursor-pointer"
                            style={{ display: 'none' }}
                            id="image-upload"
                        />
                        <label
                            htmlFor="image-upload"
                            className="absolute bottom-0 right-0 p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
                        >
                            <Upload className="h-5 w-5 text-purple-600" />
                        </label>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
                    {user.bio ? (
                        <p className="text-gray-600 text-center mt-2 mb-4">{user.bio}</p>
                    ) : (
                        <button
                            onClick={openProfileBox}
                            className="bg-gray-200 text-purple-600 rounded-lg transition-colors mt-4 mb-6 px-4 py-2 hover:bg-gray-300 flex items-center space-x-2"
                        >
                            <span>Add Your Bio</span>
                        </button>
                    )}
                    <ProfileBox {...profileBoxData} isEditing={isEditing} closeModel={closeProfileBox} />
                    <button
                        onClick={() => {/* Add logout logic */ }}
                        className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default AccountHeader;
import { AuthContext } from "../context/auth/AuthContext"
import { useContext, useEffect, useState } from "react"
import { X } from "lucide-react"
import { useSendData } from "../customHooks/useSendData"
interface userDataTypes {
    bio?: string,
    UserLocation?: string,
    company?: string,
    website?: string,
    socialLinks?: {
        linkedin?: string,
        twitter?: string,
    }
}

interface propsBoxTypes extends userDataTypes {
    isEditing: boolean,
    closeModel: () => void,
}
const ProfileBox = (userData: propsBoxTypes) => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext must be used within an AuthProvider.")
    }
    const { setUser } = context;
    console.log("user data in profile box : ", userData)

    const { data, success, isLoading, error, sendData } = useSendData();
    const [formData, setFormData] = useState<userDataTypes>({});
    useEffect(() => {
        setFormData({
            bio: userData.bio,
            UserLocation: userData.UserLocation,
            company: userData.company,
            website: userData.website,
            socialLinks: {
                linkedin: userData.socialLinks?.linkedin,
                twitter: userData.socialLinks?.twitter,
            }
        })
        console.log("form data is : ", formData)
    }, [userData])

    //when user make any changes
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        if (name === "linkedin" || name === "twitter") {
            setFormData((prev) => ({
                ...prev,
                socialLinks: {
                    ...prev.socialLinks,
                    [name]: value
                }
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }
    // when user submit the form
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(formData);
        sendData("/api/v1/users/complete-profile", formData);
    }

    useEffect(() => {
        if (data && success) {
            console.log("got the response from server : ", data);
            setUser((prev) => ({ ...prev, ...formData }));
            userData.closeModel();
        }
        if (error) {
            console.log("got the error from server : ", error)
        }
    }, [data, success, error])

    //if isEditing false then return null
    if (!userData.isEditing) {
        return null;
    }
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold">Edit Profile</h3>
                        <button
                            onClick={userData.closeModel}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bio
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        {/* Company */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company
                            </label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        {/* location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                name="UserLocation"
                                value={formData.UserLocation}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div> */}

                        {/* Website */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Website
                            </label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900">Social Links</h4>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    LinkedIn
                                </label>
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={formData.socialLinks?.linkedin}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Twitter
                                </label>
                                <input
                                    type="url"
                                    name="twitter"
                                    value={formData.socialLinks?.twitter}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={userData.closeModel}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProfileBox;
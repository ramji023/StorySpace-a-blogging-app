import { LogOut } from "lucide-react";

interface accountHeader {
    name: string;
    bio: string;
    imageUrl: string;
}

const AccountHeader = ({ name, bio, imageUrl }: accountHeader) => {
    return (
        <>
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex flex-col items-center">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                    <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                    <p className="text-gray-600 text-center mt-2 mb-4">{bio}</p>
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
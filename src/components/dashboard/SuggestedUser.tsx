interface User {
    id: number;
    name: string;
    bio: string;
    imageUrl: string;
}

const suggestedUsers: Array<User> = [
    {
        id: 1,
        name: "Sarah Wilson",
        bio: "Tech writer & Software Engineer",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
    {
        id: 2,
        name: "David Chen",
        bio: "Full-stack Developer | AI Enthusiast",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
    {
        id: 3,
        name: "Emma Thompson",
        bio: "UX Designer & Creative Writer",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    },
];
const SuggestedUser = () => {
    return (
        <>
            <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Who to Follow</h3>
                <div className="space-y-4">
                    {suggestedUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={user.imageUrl}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                                    <p className="text-sm text-gray-500">{user.bio}</p>
                                </div>
                            </div>
                            <button className="px-4 py-1 rounded-full border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors text-sm">
                                Follow
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SuggestedUser
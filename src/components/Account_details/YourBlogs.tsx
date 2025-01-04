import { Heart, MessageCircle, Bookmark, MoreVertical } from "lucide-react";

interface BlogTypes {
    title: string;
    description: string;
    date: string;
    likes: number;
    comments: number;
    saves: number;
    imageUrl: string;
}


const YourBlogs = ({ title, description, date, likes, comments, saves, imageUrl }: BlogTypes) => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                        <h3 className="text-xl font-semibold text-gray-900 hover:text-purple-600 cursor-pointer">
                            {title}
                        </h3>
                        <p className="text-gray-600 mt-2 line-clamp-2">{description}</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm text-gray-500">{date}</span>
                            <div className="flex items-center space-x-4">
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600">
                                    <Heart className="h-5 w-5" />
                                    <span>{likes}</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600">
                                    <MessageCircle className="h-5 w-5" />
                                    <span>{comments}</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600">
                                    <Bookmark className="h-5 w-5" />
                                    <span>{saves}</span>
                                </button>
                                <button className="text-gray-500 hover:text-purple-600">
                                    <MoreVertical className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-32 h-24 object-cover rounded-lg"
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default YourBlogs;
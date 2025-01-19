import { Heart, MessageCircle, Bookmark, MoreVertical } from "lucide-react";
interface BlogTypes {
    id: string,
    title: string,
    description: string,
    image: string,
    likeCount: number,
    commentCount: number,
    createdAt: string,
}

const YourBlogs = ({ id,title, description, createdAt, likeCount, commentCount, image }: BlogTypes) => {
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
                            <span className="text-sm text-gray-500">{createdAt}</span>
                            <div className="flex items-center space-x-4">
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600">
                                    <Heart className="h-5 w-5" />
                                    <span>{likeCount}</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600">
                                    <MessageCircle className="h-5 w-5" />
                                    <span>{commentCount}</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600">
                                    <Bookmark className="h-5 w-5" />
                                    {/* <span>{saves}</span> */}
                                </button>
                                <button className="text-gray-500 hover:text-purple-600">
                                    <MoreVertical className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {image && (
                        <img
                            src={image}
                            alt={title}
                            className="w-32 h-24 object-cover "
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default YourBlogs;
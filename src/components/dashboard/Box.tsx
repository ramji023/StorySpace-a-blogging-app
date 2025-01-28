import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react"
import { Link } from "react-router-dom"
interface Box {
    id: string,
    title: string,
    description: string,
    image: string,
    likeCount: number,
    commentCount: number,
    createdAt: string,
    author: string,
    profileImage: string,
}

const Box = ({ id, title, description, author, likeCount, commentCount, createdAt, image, profileImage }: Box) => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Link
                            to={`watchStory/${id}`}
                            className="text-2xl font-semibold mb-2 text-gray-900 hover:text-purple-600 cursor-pointer"
                        >
                            {title}
                        </Link>
                        <p className="text-gray-700 text-xl mb-4 line-clamp-2">{description}</p>
                        <div className="flex items-center justify-between">
                            {/* Author with Profile Image */}
                            <div className="flex items-center space-x-2">
                                {profileImage && (
                                    <img
                                        src={profileImage}
                                        alt={author}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                )}
                                <div className="flex flex-col">
                                    <span className="text-lg text-gray-500">{author}</span>
                                    <span
                                        className="text-xs text-gray-500"
                                        style={{
                                            fontFamily: "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                                        }}
                                    >
                                        {createdAt}
                                    </span>
                                </div>
                            </div>

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
                                </button>
                                <button className="text-gray-500 hover:text-purple-600">
                                    <Share2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {image && (
                        <div className="w-48 h-32">
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default Box
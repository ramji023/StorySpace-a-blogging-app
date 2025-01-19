import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react"

interface Box {
    id: string,
    title: string,
    description: string,
    image: string,
    likeCount: number,
    commentCount: number,
    createdAt: string,
    author: string,
}

const Box = ({ id,title, description, author, likeCount, commentCount, createdAt, image }: Box) => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 hover:text-purple-600 cursor-pointer">
                            {title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{author}</span>
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
                                className="w-full h-full object-cover "
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Box
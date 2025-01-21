import { useEffect, useState } from "react";
import { useSendData } from "../customHooks/useSendData";
interface Comment {
    id: number;
    username: string;
    profileImage: string;
    text: string;
}

interface CommentBoxProps {
    comments: Comment[];
    storyId: string;
}

const CommentBox = ({ comments, storyId }: CommentBoxProps) => {
    const { data, isLoading, error, success, sendData } = useSendData();
    const [newComment, setNewComment] = useState("");

    async function handlePostComment() {
        if (!newComment) {
            throw ("comment is required!!");
        }
        console.log("comment data is  ", newComment);
        const baseURL = `/api/v1/comments/write-comment/${storyId}`
        await sendData(baseURL, { content: newComment })
    }
    useEffect(() => {
        if (data && success) {
            console.log("got the response from server : ", data);
            setNewComment("");
        }
    }, [data, success])
    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
            <div className="bg-gray-50 rounded-lg p-6">
                {error && <h1 className="bg-red-600 text-sm">{error}</h1>}
                {/* Input Section */}
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                />
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handlePostComment}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Post Comment
                    </button>
                </div>
            </div>

            {/* Comments Display Section */}
            <div className="">
                {comments.length > 0 ? (
                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <div key={comment.id} className="flex items-start space-x-4">
                                <img
                                    src={comment.profileImage}
                                    alt={`${comment.username}'s profile`}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{comment.username}</p>
                                    <p className="text-sm text-gray-700">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">No comments yet.</p>
                )}
            </div>
        </div>
    );
};

export default CommentBox;

import { useEffect, useState } from 'react';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import HtmlParser from '../utils/contentParser';
import { useParams } from 'react-router-dom';
import { useFetchData } from '../customHooks/useFetchData';
import Error from "../components/Error";
import Loading from '../components/loading';

interface storyData {
  _id: string;
  title: string;
  description: string;
  content: string;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  author: string;
}
const WatchStory = () => {
  const { storyId } = useParams();  // take storyId from url
  const { data, error, isLoading, fetchData, success } = useFetchData<storyData>(`/api/v1/story/getStory/${storyId}`)
  const [storyData, setStoryData] = useState<storyData | null>(null)
  useEffect(() => {
    if (data && success) {
      console.log("fetch complete data of a story : ", data)
      setStoryData(data);
    }
  }, [data, success])
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <>
      {error && <Error />}
      {isLoading && <Loading text="wait for a while... we are preparing story for you." />}
      {storyData && (<div className="max-w-4xl mx-auto px-4 py-8">
        {/* Author Info */}
        <div className="flex items-center space-x-4 mb-8">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
            alt={storyData?.author}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-gray-900">{storyData?.author}</h3>
            <p className="text-sm text-gray-500">{storyData?.createdAt}</p>
          </div>
        </div>

        {/* Blog Title */}
        <h1
          className=" font-bold text-gray-900 mb-6"
          style={{
            fontSize: '42px',
            fontFamily: '"Sohne", "Helvetica Neue", Helvetica, Arial, sans-serif',
          }}
        >
          {storyData?.title}
        </h1>
        {/* Blog description */}
        <h1
          className="text-black mb-6"
          style={{
            fontSize: '30px',
            fontFamily: '"Sohne", "Helvetica Neue", Helvetica, Arial, sans-serif',
          }}
        >
          {storyData?.description}
        </h1>
        {/* Blog Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <HtmlParser htmlContent={storyData.content} />
        </div>

        {/* Interaction Buttons */}
        <div className="flex items-center justify-between border-t border-b border-gray-200 py-4 my-8">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center space-x-2 ${isLiked ? 'text-purple-600' : 'text-gray-600'
                } hover:text-purple-600 transition-colors`}
            >
              <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
              <span>{storyData?.likeCount}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
              <MessageCircle className="h-6 w-6" />
              <span>{storyData?.commentCount}</span>
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center space-x-2 ${isSaved ? 'text-purple-600' : 'text-gray-600'
                } hover:text-purple-600 transition-colors`}
            >
              <Bookmark className={`h-6 w-6 ${isSaved ? 'fill-current' : ''}`} />
              {/* <span>{blog.saves}</span> */}
            </button>
          </div>
          <button className="text-gray-600 hover:text-purple-600 transition-colors">
            <Share2 className="h-6 w-6" />
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <textarea
              placeholder="Write a comment..."
              className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={4}
            />
            <div className="mt-4 flex justify-end">
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>)}
    </>

  );
};

export default WatchStory;
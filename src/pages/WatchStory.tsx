import { useEffect, useState } from 'react';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import HtmlParser from '../utils/contentParser';
import { useParams } from 'react-router-dom';
import { useFetchData } from '../customHooks/useFetchData';
import { useSendData } from '../customHooks/useSendData';
import Error from "../components/Error";
import Loading from '../components/loading';
import CommentBox from '../components/CommentBox';

interface storyData {
  _id: string;
  title: string;
  description: string;
  content: string;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  author: string;
  bio: string;
  profileImage: string;
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

  // handle like , comment and save
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  console.log("liked status is : ", isLiked)
  const { data: setData, isLoading: loadingStatus, success: setSuccess, error: setError, sendData } = useSendData();

  // handle like function when user handle like action
  async function handleLikeOperation() {
    setIsLiked((prevStatus) => !prevStatus);
    const status = isLiked ? "dislike" : "like"
    const baseURl = `/api/v1/likes/like/${storyId}?action=${status}`
    console.log("base url is : ", baseURl)
    try {
      await sendData(baseURl, {})
    } catch (error) {
      setIsLiked((prevStatus) => !prevStatus);
    }
  }

  // handle save function when user save a story
  async function handleSaveOperation() {
    const prevStatus = isSaved;
    setIsSaved(!prevStatus);
    const status = isSaved ? "unsaved" : "save";
    const baseURL = `/api/v1/saveStories/save-stories/${storyId}?action=${status}`
    console.log(baseURL);
    try {
      await sendData(baseURL, {})
    } catch (error) {
      console.log("the error is : ", error);
      setIsSaved(prevStatus);
    }
  }

  //handle comment operations when user write some comments

  const [comments, setComments] = useState([
    {
      id: 1,
      username: "Jane Doe",
      profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      text: "This is an amazing story!",
    },
    {
      id: 2,
      username: "Alice Smith",
      profileImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
      text: "Great job! I loved it.",
    },
  ]);





  return (
    <>
      {error && <Error />}
      {isLoading && <Loading text="wait for a while... we are preparing story for you." />}
      {storyData && (<div className="max-w-4xl mx-auto px-4 py-8">
        {/* Author Info */}
        <div className="flex items-center space-x-4 mb-8">
          <img
            src={storyData?.profileImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"}
            alt={storyData?.author}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-medium text-gray-900">{storyData?.author}</h2>
              <button className="px-4 py-1 rounded-full border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors text-sm">
                Follow
              </button>
            </div>
            <p className="text-sm text-gray-500">{storyData?.bio}</p>
            <p
              className="text-sm text-gray-500"
              style={{
                fontFamily: "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "14px",
              }}
            >
              {storyData?.createdAt}
            </p>
          </div>
        </div>


        {/* Blog Title */}
        <h1
          className=" font-bold text-gray-900 mb-6 "
          style={{
            fontSize: '42px',
            fontFamily: '"Sohne", "Helvetica Neue", Helvetica, Arial, sans-serif',
          }}
        >
          {storyData?.title}
        </h1>
        {/* Blog description */}
        <h1
          className="text-gray-700 mb-6 border-t border-b border-gray-200 "
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
              onClick={() => { handleLikeOperation() }}
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
              onClick={() => { handleSaveOperation() }}
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
        <CommentBox comments={comments} storyId={storyId || ""} />
      </div>)}
    </>
  );
};

export default WatchStory;
import { useEffect, useState } from 'react';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { parseContent } from '../utils/contentParser';
import { useParams } from 'react-router-dom';
import { useFetchData } from '../customHooks/useFetchData';
interface BlogPost {
  title: string;
  content: string;
  author: {
    name: string;
    imageUrl: string;
    bio: string;
  };
  publishedAt: string;
  likes: number;
  comments: number;
  saves: number;
}
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
  useEffect(() => {
    if (data && success) {
      console.log("fetch complete data of a story : ", data)
    }
  }, [data, success])
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Mock data - replace with actual API call
  const blog: BlogPost = {
    title: "Understanding React Server Components",
    content: `
      <div class="blog-content">
        <p>React Server Components represent a paradigm shift in how we build React applications...</p>
        
        <h2>What are Server Components?</h2>
        <p>Server Components allow us to render components on the server while keeping interactivity on the client...</p>
        
        <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop" alt="React Server Components Diagram" />
        
        <h2>Code Example</h2>
        <pre><code class="language-typescript">
// Server Component Example
import { db } from './db';

async function BlogPost({ id }: { id: string }) {
  const post = await db.posts.findUnique({
    where: { id },
    include: { author: true }
  });

  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {post.author.name}</p>
      {post.content}
    </article>
  );
}

export default BlogPost;
        </code></pre>
        
        <h2>Another Example with JavaScript</h2>
        <pre><code class="language-javascript">
// Client Component
import { useState, useEffect } from 'react';

function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);
  
  const handleLike = async () => {
    const response = await fetch(\`/api/posts/\${postId}/like\`, {
      method: 'POST'
    });
    const data = await response.json();
    setLikes(data.likes);
  };

  return (
    <button onClick={handleLike}>
      Likes: {likes}
    </button>
  );
}
        </code></pre>
        
        <h2>Video Explanation</h2>
        <div class="video-container">
          <video controls>
            <source src="example-video.mp4" type="video/mp4">
          </video>
        </div>
      </div>
    `,
    author: {
      name: "Sarah Wilson",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      bio: "Senior Software Engineer | React Enthusiast"
    },
    publishedAt: "March 15, 2024",
    likes: 156,
    comments: 23,
    saves: 45
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Author Info */}
      <div className="flex items-center space-x-4 mb-8">
        <img
          src={blog.author.imageUrl}
          alt={blog.author.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium text-gray-900">{blog.author.name}</h3>
          <p className="text-sm text-gray-500">{blog.publishedAt}</p>
        </div>
      </div>

      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-8">{blog.title}</h1>

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none mb-8">
        {parseContent(blog.content)}
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
            <span>{blog.likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
            <MessageCircle className="h-6 w-6" />
            <span>{blog.comments}</span>
          </button>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`flex items-center space-x-2 ${isSaved ? 'text-purple-600' : 'text-gray-600'
              } hover:text-purple-600 transition-colors`}
          >
            <Bookmark className={`h-6 w-6 ${isSaved ? 'fill-current' : ''}`} />
            <span>{blog.saves}</span>
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
    </div>
  );
};

export default WatchStory;
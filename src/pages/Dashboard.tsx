import Box from "../components/dashboard/Box"
import RecommendTopics from "../components/dashboard/RecommendTopics"
import SuggestedUser from "../components/dashboard/SuggestedUser"

const sampleBlogs = [{
    title: "The Future of Web Development: What's Next?",
    description: "Exploring upcoming trends in web development, from WebAssembly to Edge Computing. Learn how these technologies will shape the future of the web.",
    author: "John Doe",
    likes: 234,
    comments: 45,
    saves: 123,
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
},
{
    title: "Mastering TypeScript: Advanced Tips and Tricks",
    description: "Deep dive into TypeScript's advanced features. Learn about generics, utility types, and how to write more maintainable code.",
    author: "Jane Smith",
    likes: 189,
    comments: 32,
    saves: 98,
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=300&fit=crop",
},
{
    title: "Building Scalable React Applications",
    description: "Best practices for building large-scale React applications. Learn about state management, performance optimization, and code organization.",
    author: "Mike Johnson",
    likes: 156,
    comments: 28,
    saves: 87,
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
}]
const Dashboard = () => {
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Main Content - Blog Feed */}
                    <div className="flex-1">
                        {sampleBlogs.map((blog, index) => (
                            <Box key={index} {...blog} />
                        ))}
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-80 shrink-0">
                        <div className="space-y-6 sticky top-24">
                            <RecommendTopics />
                            <SuggestedUser />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
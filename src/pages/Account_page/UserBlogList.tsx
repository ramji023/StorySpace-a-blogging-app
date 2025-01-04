import YourBlogs from "../../components/Account_details/YourBlogs";

const sampleUserBlogs = [
    {
        title: "Understanding React Server Components",
        description: "A deep dive into React Server Components and how they revolutionize web development by enabling better performance and user experience.",
        date: "Mar 15, 2024",
        likes: 156,
        comments: 23,
        saves: 45,
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
    },
    {
        title: "The Power of TypeScript Generics",
        description: "Learn how to leverage TypeScript generics to write more flexible and reusable code while maintaining type safety.",
        date: "Mar 10, 2024",
        likes: 234,
        comments: 34,
        saves: 67,
        imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=300&fit=crop",
    },
]
const UserBlogList = () => {
    return (
        <>
            <div className="space-y-4">
                {sampleUserBlogs.map((blog, index) => (
                    <YourBlogs key={index} {...blog} />
                ))}
            </div>
        </>
    )
}

export default UserBlogList
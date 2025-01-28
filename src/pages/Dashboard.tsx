import { useState, useEffect } from "react"
import { useFetchData } from "../customHooks/useFetchData"
import Box from "../components/dashboard/Box"
import RecommendTopics from "../components/dashboard/RecommendTopics"
import SuggestedUser from "../components/dashboard/SuggestedUser"


interface storiesType {
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
const Dashboard = () => {
    const { data, error, success } = useFetchData<storiesType[]>("/api/v1/story/getAllStories")
    const [stories, setStories] = useState<storiesType[]>([]);
    useEffect(() => {
        if (data && success) {
            console.log("all stories fetched : ", data);
            setStories(data);
        }
    }, [data, success])
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Main Content - Blog Feed */}
                    <div className="flex-1">
                        {stories.map((blog, index) => (
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
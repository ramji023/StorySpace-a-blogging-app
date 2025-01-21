import { useState, useEffect } from "react";
import { useFetchData } from "../../customHooks/useFetchData";
import YourBlogs from "../../components/Account_details/YourBlogs";

interface storiesType {
    id: string,
    title: string,
    description: string,
    image: string,
    likeCount: number,
    commentCount: number,
    createdAt: string,
}

const SavedBlogs = () => {
    const { data, error, success } = useFetchData<storiesType[]>("/api/v1/saveStories/save-stories")
    const [stories, setStories] = useState<storiesType[]>([]);
    useEffect(() => {
        if (data && success) {
            console.log("all stories fetched for current user", data);
            setStories(data);
        }
    }, [data, success])
    return (
        <>
            <div className="space-y-4">
                {stories.map((blog, index) => (
                    <YourBlogs key={index} {...blog} />
                ))}
            </div>
        </>
    )
}

export default SavedBlogs;
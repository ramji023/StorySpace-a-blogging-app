const topics: Array<string> = [
    'Technology',
    'Writing',
    'Programming',
    'Self Improvement',
    'Productivity',
    'Machine Learning',
]

const RecommendTopics = () => {
    return (
        <>
            <div className="bg-white rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Recommended Topics</h3>
                <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => (
                        <button
                            key={topic}
                            className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-purple-100 hover:text-purple-700 transition-colors"
                        >
                            {topic}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default RecommendTopics;
import { useNavigate } from 'react-router-dom';
import { Home, BookX } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-2xl w-full text-center space-y-8">
                {/* Error Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <BookX className="w-32 h-32 text-purple-600 animate-pulse" />
                        <div className="absolute -top-4 -right-4 bg-purple-100 rounded-full p-2">
                            <span className="text-2xl font-bold text-purple-600">404</span>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900">Page Not Found</h1>
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                        Oops! It seems like this story has wandered off into uncharted territory.
                        Let's get you back on track.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors w-full sm:w-auto"
                    >
                        <Home className="w-5 h-5" />
                        <span>Go Back To Home</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
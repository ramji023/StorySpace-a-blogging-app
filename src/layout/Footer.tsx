import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <>
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Brand Section */}
                        <div className="space-y-4">
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                                StorySpace
                            </span>
                            <p className="text-gray-600">
                                Where stories come to life. Share your voice with the world.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-900">Quick Links</h3>
                            <ul className="space-y-2">
                                <li className="text-gray-600 hover:text-purple-600 transition-colors"><a>Write a Story</a></li>
                                <li className="text-gray-600 hover:text-purple-600 transition-colors"><a>Read Stories</a></li>
                                <li className="text-gray-600 hover:text-purple-600 transition-colors"><a>Cateogries</a></li>
                                <li className="text-gray-600 hover:text-purple-600 transition-colors"><a>Featured Writer</a></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-900">Company</h3>
                            <ul className="space-y-2">
                                <li className="text-gray-600 hover:text-purple-600 transition-colors"><a>About us</a></li>
                                <li className="text-gray-600 hover:text-purple-600 transition-colors"><a>Careers</a></li>
                                <li className="text-gray-600 hover:text-purple-600 transition-colors"><a>Privacy Policy</a></li>
                                <li className="text-gray-600 hover:text-purple-600 transition-colors"><a>Terms of Service</a></li>
                            </ul>
                        </div>

                        {/* Connect */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-900">Connect</h3>
                            <div className="flex space-x-4">
                                <a className="text-gray-600 hover:text-purple-600 transition-colors">
                                    <Github className="h-5 w-5" />
                                </a>
                                <a className="text-gray-600 hover:text-purple-600 transition-colors">
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a className="text-gray-600 hover:text-purple-600 transition-colors">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <p className="text-center text-gray-600 flex items-center justify-center">
                            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by StorySpace Team
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;
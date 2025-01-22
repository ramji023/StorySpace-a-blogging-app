import React, { useState, useContext } from 'react';
import { Github, Linkedin, Globe, Twitter, Mail, Building2, PenSquare, X, MapPin } from 'lucide-react';
import { AuthContext } from '../../context/auth/AuthContext';
import ProfileBox from '../../components/ProfileBox';
// interface SocialLink {
//     platform: string;
//     url: string;
//     icon: typeof Github;
// }

// interface ProfileData {
//     bio: string;
//     location: string;
//     company: string;
//     email: string;
//     website: string;
//     socialLinks: {
//         github: string;
//         linkedin: string;
//         twitter: string;
//     };
// }

const About = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext must be used within an AuthProvider.");
    }
    const { user } = context;
    console.log("user data in about component  : ", user);
    const [isEditing, setIsEditing] = useState(false);
    //function to open model
    function openProfileBox() {
        setIsEditing(true);
    }

    function closeProfileBox() {
        setIsEditing(false);
    }
    // const [profileData, setProfileData] = useState<ProfileData>({
    //     bio: "Senior Software Engineer with 5+ years of experience in full-stack development. Passionate about creating scalable web applications and sharing knowledge through technical writing.",
    //     location: "San Francisco, CA",
    //     company: "TechCorp Inc.",
    //     email: "sarah.wilson@example.com",
    //     website: "https://sarahwilson.dev",
    //     socialLinks: {
    //         github: "https://github.com/sarahwilson",
    //         linkedin: "https://linkedin.com/in/sarahwilson",
    //         twitter: "https://twitter.com/sarahwilson"
    //     }
    // });

    // const [editForm, setEditForm] = useState<ProfileData>(profileData);

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setProfileData(editForm);
    //     setIsEditing(false);
    // };
   
    const profileBoxData = {
        bio : user.bio ,
        UserLocation:user.UserLocation,
        company:user.company,
        website:user.website,
        socialLinks:{
            linkedin:user.socialLinks?.linkedin ,
            twitter:user.socialLinks?.twitter ,
        }
    }
    console.log("profileBoxData in about page : ",profileBoxData);


    const socialLinks = [
        { platform: 'LinkedIn', url: user.socialLinks?.linkedin, icon: Linkedin },
        { platform: 'Twitter', url: user.socialLinks?.twitter, icon: Twitter },
    ];

    return (
        <div className="space-y-6 bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
                <h2 className="text-2xl font-semibold text-gray-900">About</h2>
                <button
                    onClick={openProfileBox}
                    className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
                >
                    <PenSquare className="w-5 h-5" />
                    <span>Edit Profile</span>
                </button>
            </div>

            {/* Bio Section */}
            <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{user.bio || "You did not add your bio yet"}</p>

                {/* Contact Information */}
                <div className="space-y-3 pt-4">
                    <div className="flex items-center space-x-3 text-gray-600">
                        <Building2 className="w-5 h-5" />
                        <span>{user.company}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <a href='#' className="hover:text-purple-600 transition-colors">{user.UserLocation}</a>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                        <Mail className="w-5 h-5" />
                        <a href={`mailto:${user.email}`} className="hover:text-purple-600 transition-colors">
                            {user.email}
                        </a>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                        <Globe className="w-5 h-5" />
                        <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">
                            {user.website}
                        </a>
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4 pt-4">
                    {socialLinks.map((social) => (
                        <a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                            <social.icon className="w-6 h-6" />
                        </a>
                    ))}
                </div>
            </div>

            <ProfileBox {...profileBoxData} isEditing={isEditing} closeModel={closeProfileBox} />
        </div>
    );
};

export default About;
import { createContext, ReactNode, useEffect, useState } from "react";
import { useFetchData } from "../../customHooks/useFetchData";
import Loading from "../../components/loading";

interface CurrentUserResponse {
    username: string,
    email: string,
    profileImage?: string,
    bio?: string,
    UserLocation?: string,
    company?: string,
    website?: string,
    socialLinks?: {
        linkedin?: string,
        twitter?: string,
    }
}

// first create the context
interface User {
    isAuthenticated: boolean,
    username: string,
    email: string,
    profileImage?: string,
    bio?: string,
    UserLocation?: string,
    company?: string,
    website?: string,
    socialLinks?: {
        linkedin?: string,
        twitter?: string,
    }
}
interface authContextType {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>;
    login(): void
}
export const AuthContext = createContext<authContextType | undefined>(undefined);



// define context provider
interface authProviderProps {
    children: ReactNode,
}
export const AuthProvider: React.FC<authProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>({
        isAuthenticated: false,
        username: '',
        email: '',
        profileImage: '',
        bio: '',
        UserLocation: '',
        company: '',
        website: '',
        socialLinks: {
            linkedin: '',
            twitter: '',
        }
    })
    const [isRedirecting, setIsRedirecting] = useState(false);

    // fetch current user data
    const { data, success, isLoading } = useFetchData<CurrentUserResponse>("/api/v1/users/current-user");
    // console.log(isLoading);
    useEffect(() => {
        // Prevent fetching user data after redirecting to /signup
        if (window.location.pathname === '/signup') {
            setIsRedirecting(true);
        }
        if (data && success && !isRedirecting) {
            // console.log(typeof data);
            console.log("get current user data : ", data);
            setUser({
                isAuthenticated: success,
                username: data.username,
                email: data.email,
                profileImage: data.profileImage,
                bio: data.bio,
                company: data.company,
                website: data.website,
                UserLocation: data.UserLocation,
                socialLinks: {
                    linkedin: data.socialLinks?.linkedin,
                    twitter: data.socialLinks?.twitter,
                }
            })
        }
    }, [data, success, isRedirecting])



    function login(): void {

    }
    return (
        <AuthContext.Provider value={{ user, login, setUser }}>
            {isLoading && isRedirecting ? <Loading text="welcome to StorySpace" /> : children}
        </AuthContext.Provider>
    )
}

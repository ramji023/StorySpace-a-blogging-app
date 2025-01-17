import { createContext, ReactNode, useEffect, useState } from "react";
import { useFetchData } from "../../customHooks/useFetchData";
import Loading from "../../components/loading";

interface CurrentUserResponse {
    username: string,
}

// first create the context
interface User {
    isAuthenticated: boolean,
    username: string,
}
interface authContextType {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>;
    login(): void
}
export const AuthContext = createContext<authContextType | null>(null);



// define context provider
interface authProviderProps {
    children: ReactNode,
}
export const AuthProvider: React.FC<authProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>({
        isAuthenticated: false,
        username: '',
    })

    // fetch current user data
    const { data, success, isLoading } = useFetchData<CurrentUserResponse>("/api/v1/users/current-user");
    // console.log(isLoading);
    useEffect(() => {
        if (data && success) {
            // console.log(typeof data);
            console.log("get current user data : ", data);
            setUser({
                isAuthenticated: success,
                username: data.username,
            })

        }
    }, [data, success])



    function login(): void {

    }
    return (
        <AuthContext.Provider value={{ user, login, setUser }}>
            {isLoading ? <Loading text="welcome to StorySpace"/> : children}
        </AuthContext.Provider>
    )
}

import { createContext, ReactNode, useState,useContext } from "react";

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
        isAuthenticated: true,
        username: '',
    })

    function login(): void {

    }
    return (
        <AuthContext.Provider value={{ user, login, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}



// // Safe useContext hook for consuming context
// export const useAuth = ():authContextType  => {
//     const context = useContext(AuthContext);
//     if (!context) {
//       throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
//   };
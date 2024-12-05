import { useEffect, createContext, useState } from "react";
import { User } from "@/types/user-type";

export const UserContext = createContext<{
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}>({
    user: null,
    setUser: () => { }
});

export const UserProvider = ({ children, userData }: { children: React.ReactNode, userData?: User }) => {
    const [user, setUser] = useState<User | null>(userData ?? null);
    useEffect(() => {
        // getProfile().then(setUser).catch(() => {
        //     localStorage.removeItem("backend_access_token")
        // })
    }, []);
    console.log("UserProvider", user)
    return (
        
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
import { getProfile } from "@/repositories/user-repository";
import { User } from "@/types/user-type";
import { createContext, useEffect, useState } from "react";

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
        getProfile().then(setUser).catch(console.error);
    }, []);
    return (
        
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
import {createContext} from "react";
import {type User} from "../../model/User.ts";

export interface UserContextType {
    user: User | null
    setUser: (user: User | null) => void
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
})
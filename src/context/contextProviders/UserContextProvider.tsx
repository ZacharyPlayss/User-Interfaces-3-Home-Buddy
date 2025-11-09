import {type ReactNode} from "react";
import type {User} from "../../model/User.ts";
import {UserContext} from "../contexts/UserContext.tsx";
import {useLocalStorage} from 'usehooks-ts'

interface WithChildren {
    children: ReactNode
}


export function UserContextProvider({children}: WithChildren) {
    const [user, setUser] = useLocalStorage<User | null>("user",null)

    return (
        <UserContext.Provider
            value={{
                user: user,
                setUser: setUser
            }}>
            {children}
        </UserContext.Provider>
    );
}

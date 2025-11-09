import {type ReactNode, useContext} from "react";
import {UserContext} from "../../context/contexts/UserContext.tsx";
import type {UserRole} from "../../model/User.ts";

interface WithChildren {
    children: ReactNode,
    fallback?: ReactNode;
    requiredRole?:UserRole
}

export function RequiresUserBoundary({ children, fallback, requiredRole }: WithChildren) {
    const { user } = useContext(UserContext);

    if (user == null || (requiredRole != null && user.role != requiredRole)) {
        return fallback ?? null;
    }
    return <>{children}</>;
}
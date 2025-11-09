export type UserRole = "user"|"admin";

export type User = {
    id:string,
    name:string,
    role: UserRole
}

export const UserUser : User ={
    id:"1",
    name:"Eline",
    role:"user"
}
export const AdminUser : User ={
    id:"1",
    name:"Zachary",
    role:"admin"
}
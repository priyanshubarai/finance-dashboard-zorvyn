import { create } from 'zustand'

export type RoleType = "admin" | "viewer";
export type RoleStoreType = {
    role : RoleType;
    setRole : (role : RoleType) => void;
}

export const useRoleStore = create<RoleStoreType>((set)=> ({
    role : "viewer",
    setRole: (newRole : RoleType) => set({role:newRole}),
}));

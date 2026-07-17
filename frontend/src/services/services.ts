import type { User as UserModel } from "../models/user";

const API_URL = import.meta.env.VITE_API_URL ?? "/api";

const sessionRequest: RequestInit = {
    credentials: "include",
};

export async function getUser() {
    const res = await fetch(`${API_URL}/users/me`, {
        ...sessionRequest,
    });
    if (!res.ok) {
        throw new Error("Failed to fetch user");
    }
    return res.json() as Promise<UserModel>;
}


export type LoginCredentials = {
    username: string;
    password: string;
}

export async function login(credentials: LoginCredentials) {
    const res = await fetch(`${API_URL}/users/login`, {
        ...sessionRequest,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });

    if (!res.ok) {
        throw new Error("Failed to log in");
    }

    return res.json() as Promise<UserModel>;
}

export type SignUpCredentials = {
    username: string;
    email: string;
    password: string;
}

export async function signUp(credentials: SignUpCredentials) {
    const res = await fetch(`${API_URL}/users/signup`, {
        ...sessionRequest,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });

    if (!res.ok) {
        throw new Error("Failed to sign up");
    }

    return res.json() as Promise<UserModel>;
}


export async function logout() {
    const res = await fetch(`${API_URL}/users/logout`, {
        ...sessionRequest,
        method: "POST",
    });

    if (!res.ok) {
        throw new Error("Failed to log out");
    }
}

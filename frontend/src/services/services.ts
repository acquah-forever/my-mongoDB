import type { User } from "../models/user";

const API_URL = import.meta.env.VITE_API_URL ?? "/api";

const sessionRequest: RequestInit = {
    credentials: "include",
};

export async function getUser(): Promise<User> {
    const res = await fetch(`${API_URL}/users/me`, {
        ...sessionRequest,
        method: "GET",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch user");
    }
    return res.json() as Promise<User>;
}

export type SignUpCredentials = {
    username: string;
    email: string;
    password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
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

    return res.json() as Promise<User>;
}

export type LoginCredentials = {
    username: string;
    password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
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

    return res.json() as Promise<User>;
}


export async function logout(): Promise<void> {
    const res = await fetch(`${API_URL}/users/logout`, {
        ...sessionRequest,
        method: "POST",
    });

    if (!res.ok) {
        throw new Error("Failed to log out");
    }
}

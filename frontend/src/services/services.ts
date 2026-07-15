import type { User } from "../models/user";

const API_URL = import.meta.env.VITE_API_URL;

export async function getUser(): Promise<User> {
    const res = await fetch(`${API_URL}/user`);
    if (!res.ok) {
        throw new Error("Failed to fetch user");
    }
    return res.json() as Promise<User>;
}

type signUpCredentials = {
    username: string;
    email: string;
    password: string;
}

export async function signUp(credentials: signUpCredentials): Promise<User> {
    const res = await fetch(`${API_URL}/auth/signup`, {
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
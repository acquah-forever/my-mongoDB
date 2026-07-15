import type { User } from "../models/user";

const API_URL = import.meta.env.VITE_API_URL;

export async function getUser(): Promise<User> {
    const res = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
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
    const res = await fetch(`${API_URL}/users/signup`, {
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

type loginCredentials = {
        email: string;
        password: string;
    }

export async function login(credentials: loginCredentials): Promise<User> {
    const res = await fetch(`${API_URL}/users/login`, {
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


async function logoutUser() {
        const res = await fetch("/api/users/logout", {
            method: "POST",
        })

        if (!res.ok) {
            throw new Error("Failed to log out user")
        }

    }
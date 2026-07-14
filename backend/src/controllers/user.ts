import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        if (!authenticatedUserId) {
            throw createHttpError(401, "User not authenticated");
        }

        const user = await UserModel.findById(authenticatedUserId).select("+email").exec();

        if (!user) {
            throw createHttpError(404, "User not found");
        }

        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
}

interface SignUpBody {
    username?: string;
    email?: string;
    password?: string;
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {

    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }

        const existingUsername = await UserModel.findOne({ username: username }).exec();

        if (existingUsername) {
            throw createHttpError(409, "Username already exists");
        }

        const existingEmail = await UserModel.findOne({ email: email }).exec();

        if (existingEmail) {
            throw createHttpError(409, "Email already exists");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
        });

        req.session.userId = newUser._id.toString();

        res.status(201).json(newUser);

    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    username?: string;
    password?: string;
}

export const logIn: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {

    const username = req.body.username;
    const passwordRaw = req.body.password;

    try {
        if (!username || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }

        const user = await UserModel.findOne({ username: username }).select("+password +email").exec();

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(passwordRaw, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        req.session.userId = user._id.toString();

        res.status(201).json(user);

    } catch (error) {
        next(error);
    }
}

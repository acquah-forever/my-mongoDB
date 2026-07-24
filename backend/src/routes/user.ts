import express from "express";
import { getAuthenticatedUser,signUp,logIn,logOut } from "../controllers/user";

const router = express.Router();

router.get("/me", getAuthenticatedUser);
router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);


export default router;
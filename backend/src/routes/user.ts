import express from "express";
import { getAuthenticatedUser,signUp,logIn } from "../controllers/user";

const router = express.Router();

router.get("/me", getAuthenticatedUser);
router.post("/signup", signUp);
router.post("/login", logIn);



export default router;
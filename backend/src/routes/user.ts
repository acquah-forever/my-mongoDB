import express from "express";
import { signUp,logIn } from "../controllers/user";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);

export default router;
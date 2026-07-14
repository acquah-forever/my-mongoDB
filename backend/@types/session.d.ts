import mongoose from "mongoose";

declare global {
    namespace Express {
        interface Session {
            userId: mongoose.Types.ObjectId;
        }
    }
}

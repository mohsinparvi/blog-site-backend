import express from "express";
import {
  loginUser,
  registerUser,
  userProfile,
} from "../controllers/user.controllers.js";
import { authGuard } from "../middleware/auth.middleware.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(authGuard, userProfile);

export default router;

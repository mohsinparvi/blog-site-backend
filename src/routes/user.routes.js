import express from "express";
import {
  loginUser,
  registerUser,
  updateUserProfile,
  updateUserProfilePicture,
  userProfile,
} from "../controllers/user.controllers.js";
import { authGuard } from "../middleware/auth.middleware.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(authGuard, userProfile);
router.route("/update-user-profile").put(authGuard, updateUserProfile);
router
  .route("/update-user-profile-picture")
  .put(authGuard, updateUserProfilePicture);

export default router;

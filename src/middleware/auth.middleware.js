import { verify } from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import User from "../models/user.model";

const authGuard = (req, res, next) => {
  if (
    !req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    throw new ApiError(401, "Not authorized, No Token ");
  try {
    const token = req.headers.authorization.split(" ");
    const { id } = verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = User.findById(id).select("-password");
    next();
  } catch (error) {
    throw new ApiError(401, "Not authorized, Token Failed");
  }
};

export default authGuard;

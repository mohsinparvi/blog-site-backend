import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

import User from "../models/user.model.js";

const authGuard = async (req, _, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { _id } = decodedToken;

    req.user = await User.findById(_id).select("-password");
    next();
  } else {
    throw new ApiError(401, "Not authorized, No Token ");
  }
};

export { authGuard };

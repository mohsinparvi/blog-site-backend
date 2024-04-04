import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields  are required");
  }

  const existedUser = await User.findOne({ email });
  console.log("existedUser:", existedUser);
  if (existedUser) throw new ApiError(409, "Email already exist!");

  const user = await User.create({
    fullName,
    email: email.toLowerCase(),
    password,
  });
  const createduser = await User.findById(user._id).select("-password");
  if (!createduser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        id: user._id,
        email: user.email,
        avatar: user.avatar,
        verified: user.verified,
        admin: user.admin,
        verificationCode: user.verificationCode,
        accessToken: await user.generateAccessToken(),
      },
      "user created successfully"
    )
  );
});

export { registerUser };

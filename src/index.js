import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/DB.js";
import app from "./app.js";
dotenv.config();

//connecting database
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `⚙️  Server is running at port http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!!", err);
  });

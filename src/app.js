import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//user routes
import userRoute from "./routes/user.routes.js";
app.use("/api/v1/users", userRoute);

export default app;

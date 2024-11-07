import cors from "cors";
import express from "express";
import { PORT } from "./config/index.js";

// routes
import handleErrors from "./middlewares/handleErrors.js";
import authRouter from "./routes/AuthRouter.js";
import userRouter from "./routes/UserRouter.js";
import addressRouter from "./routes/AddressRouter.js";
import socialMediaRouter from "./routes/SocialMediaRouter.js";
import fileRouter from "./routes/FileRouter.js";
import reviewRouter from "./routes/ReviewRouter.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/api", (_, res) => {
  res.json({ message: "Hello from server!" });
});

// ROUTES
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/address", addressRouter);
app.use("/api/social-media", socialMediaRouter);
app.use("/api/file", fileRouter);
app.use("/api/review", reviewRouter);

// New routes
// import nameRouter from "./routes/NameRouter.js";
// app.use("/api/name-endpoint", nameRouter);

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server start with port ${PORT}`);
});

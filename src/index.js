import cors from "cors";
import express from "express";
import { PORT } from "./config/index.js";

// routes
import authRouter from "./routes/AuthRouter.js";

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

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server start with port ${PORT}`);
});

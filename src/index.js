import cors from "cors";
import express from "express";
import { PORT } from "./config/index.js";

// routes
import handleErrors from "./middlewares/handleErrors.js";
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

// ROUTES
app.use("/api/auth", authRouter);

// New routes
// import nameRouter from "./routes/NameRouter.js";
// app.use("/api/name-endpoint", nameRouter);

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server start with port ${PORT}`);
});

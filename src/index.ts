import cors from "cors";
import express from "express";

import { PORT } from "./config";

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

app.listen(PORT, () => {
  console.log(`Server start with port ${PORT}`);
});

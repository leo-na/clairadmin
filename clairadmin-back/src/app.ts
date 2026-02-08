import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);


app.get("/", (_req, res) => {
  res.json({ status: "ClairAdmin API OK" });
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);


export default app;

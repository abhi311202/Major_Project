import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./Routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello Abi!");
});

app.use("/User", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});


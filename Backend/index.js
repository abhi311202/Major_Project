import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./Routes/userRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import superAdminRoutes from "./Routes/superAdminRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello Abi!");
});

app.use("/User", userRoutes);
app.use("/Admin", adminRoutes);
app.use("/SuperAdmin", superAdminRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error(err));
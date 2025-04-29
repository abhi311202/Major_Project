import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./Routes/userRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import superAdminRoutes from "./Routes/superAdminRoutes.js";
import cookieParser from "cookie-parser";


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

dotenv.config();
const port = process.env.PORT||4000;

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
mongoose.connect(process.env.MongoDBURI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  // app.listen(PORT, () => console.log(Server running on port ${PORT}));
})
.catch(err => console.error(err));
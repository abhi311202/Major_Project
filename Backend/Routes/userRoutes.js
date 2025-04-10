import express from "express";
const router = express.Router();

// const { registerUser } = require("../Controllers/userControllerSQL");
import { registerUser, userLogin } from "../Controllers/userControllerSQL.js";

router.post("/register", registerUser);
router.post("/login", userLogin);

// module.exports = router;
export default router;

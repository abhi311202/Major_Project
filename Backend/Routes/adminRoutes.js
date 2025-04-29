import express from "express";
const router = express.Router();

import userMiddleware from "../Middlewares/user.mid.js";

import {
  registerAdmin,
  adminLogin,
  logout,
  uploadDocs,
  getDocs,
} from "../Controllers/adminController.js";

router.post("/register", registerAdmin);
router.post("/login", adminLogin);
router.post("/logout", logout);
router.post("/adminDocuments", uploadDocs);
router.post("/adminDocumentsUploaded", getDocs);
// router.post("/verify", userMiddleware, demo);

export default router;

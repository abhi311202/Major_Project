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

import { DocUpload } from "../Controllers/DocumentController.js";

router.post("/register", registerAdmin);
router.post("/login", adminLogin);
router.post("/logout", logout);
<<<<<<< HEAD
router.post("/UploadDocument", DocUpload);
=======
router.post("/adminDocuments", uploadDocs);
router.post("/adminDocumentsUploaded", getDocs);
>>>>>>> 2aba28a227849b55085c9d632265d58eb505a7e5
// router.post("/verify", userMiddleware, demo);

export default router;

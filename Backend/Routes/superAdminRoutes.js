import express from "express";
const router = express.Router();

import userMiddleware from "../Middlewares/user.mid.js";

import {
  adminRequest,
  adminLogin,
  logout,
  Approve_Req,
} from "../Controllers/superAdminController.js";

//   router.post("/register", registerAdmin);
router.post("/login", adminLogin);
router.get("/AdminRequest", adminRequest);
router.post("/logout", logout);
router.post("/AprooveReq", Approve_Req);
//   router.post("/verify", userMiddleware, demo);

export default router;

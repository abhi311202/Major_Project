import {
  checkAdminExistsByEmail,
  checkAdminExistsByAadhar,
  checkAdminExistByUsername,
  createAdminReq,
  loginAdmin,
} from "../Models/AdminModel.js";

export const registerAdmin = async (req, res) => {
  console.log(req.body);
  try {
    const admin_exist = await checkAdminExistsByEmail(req.body.email);
    const admin_exist_aadhar = await checkAdminExistsByAadhar(req.body.aadhar);
    const admin_exist_username = await checkAdminExistByUsername(
      req.body.username
    );

    console.log("Admin Exists email : " + admin_exist);
    console.log("Admin Exists aadhar : " + admin_exist_aadhar);
    console.log("Admin Exists username : " + admin_exist_username);

    if (admin_exist_username) {
      if (admin_exist_username === "pending_admin_req") {
        return res.status(409).json({
          error: "Admin with this Username is already in Pending Queue!",
        });
      } else if (admin_exist_username === "admin") {
        return res.status(409).json({
          error: "Admin with this Username is already Registered!",
        });
      }
    } else if (admin_exist) {
      if (admin_exist === "pending_admin_req") {
        return res.status(409).json({
          error: "Admin with this Email is already in Pending Queue!",
        });
      } else if (admin_exist === "admin") {
        return res
          .status(409)
          .json({ error: "Admin with this Email is already Registered!" });
      }
    } else if (admin_exist_aadhar) {
      if (admin_exist_aadhar === "pending_admin_req") {
        return res.status(409).json({
          error: "Admin with this Aadhar is already in Pending Queue!",
        });
      } else if (admin_exist_aadhar === "admin") {
        return res.status(409).json({
          error: "Admin with this Aadhar Number is already Registered!",
        });
      }
    }
    console.log("hello");
    const admin = await createAdminReq(req.body);
    console.log("hello2");
    res.status(201).json(admin);
  } catch (err) {
    // console.error(err);
    console.log(`Error in Controller: ${err}`);
    res.status(500).json({ error: err.detail });
    0;
  }
};

export const adminLogin = async (req, res) => {
  console.log(req.body);
  const { username, password_hash, email } = req.body;
  if (username && password_hash) {
    console.log("Username API CAlled " + username, password_hash);

    try {
      const result = await loginAdmin(
        req.body.username,
        req.body.password_hash
      );
      // console.log(result);

      res.cookie("jwt", result.token);
      res.status(200).json(result);
    } catch (err) {
      console.log(`Error in Controller Login: ${err.message}`);
      res.status(500).json({ error: err.message });
    }
  } else if (email && password_hash) {
    console.log("Email API Called " + email, password_hash);
  }
};

export const logout = async (req, res) => {
    try {
      res.clearCookie("jwt");
      res.status(200).json({ message: "Logout Successfull!!" });
    } catch (error) {
      res.status(500).json({ errors: "Error in logout" });
      console.log("Error in logout", error);
    }
  };



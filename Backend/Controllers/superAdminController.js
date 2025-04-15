import { getAdminRequests, loginAdmin } from "../Models/SuperAdminModel.js";

export const adminRequest = async (req, res) => {
  try {
    const requests = await getAdminRequests();

    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error("Error fetching pending admin requests:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch pending admin requests.",
    });
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
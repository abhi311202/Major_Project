import {
  getAdminRequests,
  loginAdmin,
  getPendingReqByID,
  Approve_Pending_Req,
  Delete_Pending_Req_By_ID,
  Delete_From_Admin_Table_By_ID,
  Delete_Pending_Req_By_ID1,
} from "../Models/SuperAdminModel.js";

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

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout Successfull!!" });
  } catch (error) {
    res.status(500).json({ errors: "Error in logout" });
    console.log("Error in logout", error);
  }
};

export const Approve_Req = async (req, res) => {
  try {
    const { SuperAdmin_id, Pending_Request_id } = req.body;
    // console.log(Pending_Request_id);
    const pendingReq = await getPendingReqByID(Pending_Request_id);

    if (pendingReq) {
      //   console.log(pendingReq);
      const AproovedAdmin = await Approve_Pending_Req(
        SuperAdmin_id,
        pendingReq
      );

      if (!AproovedAdmin) {
        return res.status(404).json({
          error: "Insetion of Pending Request in Admin Table Failed",
          message: "Error in Approving request",
        });
      } else {
        const dele = await Delete_Pending_Req_By_ID(Pending_Request_id);
        if (!dele) {
          console.log(AproovedAdmin);
          const deletfromAdmin = await Delete_From_Admin_Table_By_ID(
            AproovedAdmin
          );
          console.log(deletfromAdmin);
        } else {
          return res.status(200).json({
            message: "Request Approved Seccessfully",
          });
        }
      }
    } else {
      return res.status(404).json({
        error: "No Pending Request found.",
        message: "No Pendfing Request found, Please Refresh the page..!!",
      });
    }
  } catch (error) {
    console.log("Error in Approving Request: ", error);
    return res.status(500).json({ errors: "Error in Approving Request." });
  }
};

export const Delete_Req = async (req, res) => {
  try {
    const { Pending_Request_id } = req.body;
    const dele = await Delete_Pending_Req_By_ID1(Pending_Request_id);
    if (dele) {
      return res.status(200).json({
        message: "Request Deleted Seccessfully",
      });
    } else {
      throw new Error("Request Deletion Failed");
    }
  } catch (error) {
    console.log("Error in Deleting Request: ", error);
    return res.status(500).json({
      message: "Request Deletion Failed",
      error: error.message || error,
    });
  }
};

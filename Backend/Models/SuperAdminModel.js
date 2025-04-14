import client from "../config/sqlDB.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginAdmin = async (username, password) => {
  const query = `SELECT * FROM "super_admin"
        WHERE username = $1 AND is_delete = false
        LIMIT 1;`;

  const result = await client.query(query, [username]);

  if (result.rows.length === 0) {
    console.log(result);
    throw new Error("Super Admin not found");
  }

  const super_admin = result.rows[0];

  const isMatch = await bcryptjs.compare(password, super_admin.password_hash);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  // console.log(user);

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: super_admin.id,
      username: super_admin.username,
      email: super_admin.email,
      //   role: user.role || "user", // if role exists
    },
    process.env.JWT_USER_PASSWORD,
    { expiresIn: "1m" }
  );

  const { password_hash, ...userWithoutPassword } = super_admin;

  return {
    message: "Login Successful!!",
    SuperAdmin: userWithoutPassword,
    token,
  };
};

export const getAdminRequests = async () => {
  const query = `SELECT * FROM pending_admin_req WHERE is_delete = FALSE ORDER BY created_at DESC;`;
  const result = await client.query(query);

  if (result.rows.length === 0) {
    console.log(result);
    throw new Error("No Pending Request found!");
  } else {
    return result.rows;
  }
};

export const getPendingReqByID = async (Pending_Request_id) => {
  //   const query = `SELECT * FROM pending_admin_req WHERE id = $1;`;
  const query = `SELECT
      id,
      name,
      username,
      password_hash,
      email,
      phone,
      dob,
      gender,
      aadhar,
      profession,
      organization,
      profile_picture_url
  FROM pending_admin_req
  WHERE id = $1;`;

  const result = await client.query(query, [Pending_Request_id]);

  return result.rows.length > 0 ? result.rows[0] : false;
};

export const Approve_Pending_Req = async (SuperAdmin_id, pendingReq) => {
  const { id, ...pendingReqWithoutId } = pendingReq;
  console.log(pendingReqWithoutId.name);

  query = `INSERT INTO admin (
    name,
    username,
    password_hash,
    email,
    phone,
    dob,
    gender,
    aadhar,
    profession,
    organization,
    profile_picture_url,
    is_active,
    is_delete,
    created_at,
    updated_at,
    deleted_at,
    approver_id
) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9,
    $10,
    $11,
    TRUE,
    FALSE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    '3000-12-31 00:00:00',
    $12 
);`;

  const result = await client.query(query, [
    pendingReqWithoutId.name,
    pendingReqWithoutId.username,
    pendingReqWithoutId.password_hash,
    pendingReqWithoutId.email,
    pendingReqWithoutId.phone,
    pendingReqWithoutId.dob,
    pendingReqWithoutId.gender,
    pendingReqWithoutId.aadhar,
    pendingReqWithoutId.profession,
    pendingReqWithoutId.organization,
    pendingReqWithoutId.profile_picture_url,
    SuperAdmin_id,
  ]);

  

};

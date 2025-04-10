// const { createUser } = require('../models/userModel');
import { createUser } from "../Models/UserModelSQL.js";

export const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const userLogin = async (req, res)=>{
  console.log(req.body);
  try{
    
  } catch (err){

  }
};
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../schema/user";

const saltRounds =12;

export const signUp = async (req, res) => 
{
    try {
        const { password } = req.body
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const user = await User.create({...req.body, password: hash})
        res.status(201).json({success:true, user})
} catch (error) {
    console.log(error);
    if(error.code === 11000){
        res.status(400).json({success:false, message:"User already exists"})
    }
}
}
export const login = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email: email });
  
    if (!user) {
      res
        .status(404)
        .json({ success: false, error: "Username or password is wrong" });
      return;
    }
  
    const isCompare = bcrypt.compareSync(password, user.password);
  
    if (!isCompare) {
      res
        .status(401)
        .json({ success: false, error: "Username or password is wrong" });
      return;
    }
  
    const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "1h",
    });
  
    res.status(200).json({ success: true, token : token, message : "Login success" });
  };
export const forgotPassword = async (req,res ) => {
  
}
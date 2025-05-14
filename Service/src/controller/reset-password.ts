import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../schema/user';

const saltRounds = 12;

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({email:email});

    if (!user) {
        res.status(404).json({ success: false, error: 'User not found' });
        return;
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "player.crm4040@gmail.com",
        pass: "yjrnxnzkhcxclqgb",
      },
    });
    const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "1h",
    });
    const info = await transporter.sendMail({
      from: "Food delivery service", // sender address
      to: email, // list of receivers
      subject: "Нууц үг солих хүсэлт", // Subject line
      html: `
        <h1>Reset password</h1>
        <p>Click <a href="http://localhost:3000/reset-password?token=${token}"> <button style="padding: 6px 12px; background-color: #3768FF; text: #FFF;">here </button> </a>  to reset your password</p>
      `,
    });
  
    console.log(info);
  
    res.json({ message: "Mail sent" });
  };

  export const updatePassword = async (req, res) => {
    const { _id, password } = req.body;
    
    const salt = bcrypt.genSaltSync(saltRounds);
  
    const hash = bcrypt.hashSync(password, salt);
  
    const user = await User.findByIdAndUpdate(_id, { password: hash });
  
    console.log(user);
  
    res.json({ success: true });
  };
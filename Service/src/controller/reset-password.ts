import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../schema/user';

const saltRounds = 12;

export const forgotPassword = async (req, res) => {
    // const { email } = req.body;

    // const user = await User.findOne({email:email});

    // if (!user) {
    //     res.status(404).json({ success: false, error: 'User not found' });
    //     return;
    // }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "chinguunbats9@gmail.com",
            pass: "jaqiglfgezugldvf",
        },
    });
    const info = await transporter.sendMail({
        from: "Test", // sender address
        to: "chinguunbats9@gmail.com", // list of receivers
        subject: "Reset password", // Subject line
        html: `
          <h1>Reset password</h1>
          <p>Click<button style="padding: 6px 12px; background-color: #3768FF; text: #FFF;">here </button> </a>  to reset your password</p>
        `,
      });
    
      console.log(info);
    
      res.json({ message: "Mail sent" });
}
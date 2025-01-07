import nodemailer from "nodemailer";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //TODO configer mail for usage
    const hashedtoken = await bcrypt.hash(userId.toString(), 10);
    
    // console.log("mail",userId)
    // console.log("email type",emailType)
    // console.log("Email type of:",typeof emailType)

    if (emailType === "VERIFY") {
    
      const updateUser = await User.findByIdAndUpdate(userId, {       
        $set: {
          verifyToken: hashedtoken,
          verifyTokenExpiry:new Date(Date.now() + 3600000 ),
        },
        
      },
    );
      // console.log("Updated User for VERIFY", updateUser);
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedtoken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "6cb1ca15050005",
        pass: "5816eb4485cc75",
      },
    });

    const mailOption = {
      from: "work.kanishk@proton.me", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset Your password", // Subject line
      html: `<p> Click <a href ="${process.env.DOMAIN}"> here <?a> to 
            ${
              emailType === "VERIFY"
                ? "Verify your email"
                : "reset your password"
            }
            or copy the line in your browser .
            <br> ${process.env.DOMAIN}/verifyemail?VerifyToken=${hashedtoken}
            </p>`,
    };

    const mailResponce = await transporter.sendMail(mailOption);
    return mailResponce;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

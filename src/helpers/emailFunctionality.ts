import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { User } from "@/models/userModel";

// email type to define for forgot password or verify email type
const sendMail = async ({ to, emailType, userId }: any) => {
  try {
    // Generate a hashed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpirty: Date.now() + 3600000,
      });
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERID,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "dushyant@gmail.com",
      to,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click 
  <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
    here
  </a> 
  to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
  or copy and paste the link below in your broswer.
  <br/> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
</p>
`,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default sendMail;

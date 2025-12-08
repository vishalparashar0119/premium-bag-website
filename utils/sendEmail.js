import 'dotenv/config';
import nodemailer from 'nodemailer';


const sendEmail = async (email, otp) => {
      const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {

                  user: process.env.GMAIL_USER,
                  pass: process.env.GMAIL_APP_PASSWORD,
            },
      });

      const info = await transporter.sendMail({
            from: `"Scatch Bags" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Verify your email – Scatch Bags",

            // Plain text (fallback)
            text: `
Hello,

We received a request to verify your email for your Scatch Bags account.

Your One-Time Password (OTP) is:
${otp}

This OTP is valid for 10 minutes.

If you didn’t request this, please ignore this email.

– Scatch Bags Team
  `,

            // HTML email
            html: `
    <div style="font-family: Arial, sans-serif; max-width: 520px; margin: auto; padding: 20px; border: 1px solid #eee;">
      <h2 style="color: #333; text-align: center;">Email Verification</h2>

      <p style="font-size: 15px; color: #555;">
        Hello,
      </p>

      <p style="font-size: 15px; color: #555;">
        We received a request to verify your email address for your 
        <strong>Scatch Bags</strong> account.
      </p>

      <p style="font-size: 15px; color: #555;">
        Use the following OTP to complete your verification:
      </p>

      <div style="text-align: center; margin: 20px 0;">
        <span style="
          display: inline-block;
          font-size: 26px;
          letter-spacing: 6px;
          font-weight: bold;
          padding: 12px 24px;
          background: #f4f4f4;
          border-radius: 6px;
          color: #111;
        ">
          ${otp}
        </span>
      </div>

      <p style="font-size: 14px; color: #777;">
        This OTP is valid for <strong>3 minutes</strong>.
        Please do not share it with anyone.
      </p>

      <p style="font-size: 14px; color: #777;">
        If you did not request this verification, you can safely ignore this email.
      </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

      <p style="font-size: 12px; color: #999; text-align: center;">
        © ${new Date().getFullYear()} Scatch Bags. All rights reserved.
      </p>
    </div>
  `
      });


      return info
}

export default sendEmail;
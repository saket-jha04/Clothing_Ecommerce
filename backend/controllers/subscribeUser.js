import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const subscribeUser = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    try {
        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS 
            }
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Thank You for Subscribing!",
            text: `Hello ${email.split('@')[0]}, 

Thank you for subscribing to our newsletter. Stay tuned for the latest updates! 

Best regards, 
Nothing`
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Thank you for subscribing! Check your email." });

    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ success: false, message: "Failed to send email", error: error.message });
    }
};

import Message from "../models/Message.js";
import { transporter } from "../config/mail.js";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new Message({
      name,
      email,
      subject,
      message
    });

    await newMessage.save();

    // 📧 Send email to YOU
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📩 New Message: ${subject}`,
      html: `
        <h2>New Message from Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(201).json({ message: "Message sent successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
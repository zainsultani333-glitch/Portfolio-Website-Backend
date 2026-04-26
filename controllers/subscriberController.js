import Subscriber from "../models/Subscriber.js";
import { transporter } from "../config/mail.js";

export const addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    const newSub = new Subscriber({ email });
    await newSub.save();

    // 📧 Send email to YOU
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "🎉 New Subscriber",
      html: `
        <h2>New Subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
      `,
    });

    res.status(201).json({ message: "Subscribed successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
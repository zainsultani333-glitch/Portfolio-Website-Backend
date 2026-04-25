import Subscriber from "../models/Subscriber.js";

export const addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    const newSub = new Subscriber({ email });
    await newSub.save();

    res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
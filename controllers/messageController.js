import asyncHandler from "express-async-handler";
import Message from "../models/messageModel.js";
import nodemailer from "nodemailer";

const nodeMailer = (name, email, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mailmerchant1018@gmail.com',
      pass: 'hfdzvpcuttllfohn'
    }
  });
  
  const mailOptions = {
    from: email,
    to: 'vignaraj03@gmail.com',
    subject: subject,
    text: `${name}\nMail: ${email}\n${message}`
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// @desc    Get saves messages from users
// @route   GET /api/messages/
// @access  Public
const getMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find()
        .sort({ _id: -1 })
        .select("-__v -updatedAt");

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
});

//@description     Add new message
//@route           POST /api/messages/
//@access          Public
const addMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Please Fill all the fields");
  } else {
    const newMessage = new Message({ 
        name,
        email,
        subject,
        message
    });

    newMessage.save();
    nodeMailer(name, email, subject, message);

    res.status(201).send("Message saved Successfully!!!");
  }
});

//@description     Delete single Message
//@route           POST /api/messages/delete
//@access          Private
const deleteMessage = asyncHandler(async (req, res) => {

  const ID = req.params.id;
  const message = await Message.findById(ID);

  if (message) {
    await message.remove();
    res.json({ message: "Message Removed" });
  } else {
    res.status(404);
    throw new Error("Message not Found");
  }
});

export { addMessage, getMessages, deleteMessage };

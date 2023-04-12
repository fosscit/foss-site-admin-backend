import asyncHandler from "express-async-handler";
import Message from "../models/messageModel.js";
import axios from "axios";

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
  const { name, mail, subject, message } = req.body;

  if (!name || !mail || !message) {
    res.status(400);
    throw new Error("Please Fill all the fields");
  } else {
    const newMessage = new Message({ 
        name,
        email: mail,
        subject,
        message
    });

    newMessage.save();
    
    axios.post(process.env.MAIL_MERCHANT_URI, req.body)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });

    res.status(201).send("Message saved Successfully!!!");
  }
});

//@description     Delete single Message
//@route           DELETE /api/messages/:id
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

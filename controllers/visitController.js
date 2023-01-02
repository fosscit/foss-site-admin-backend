import asyncHandler from "express-async-handler";
import { Visit, DD } from "../models/visitModel.js";
import generateToken from "../utils/generateToken.js";

//@description     Register new user
//@route           POST /api/visits/
//@access          Public
const registerVisitor = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const visitorExists = await Visit.findOne({ email });

  if (visitorExists) {
   
    const visitor = await Visit.updateOne({email: email}, {name: name, visitCount: visitorExists.visitCount + 1});
    
    if(visitor) {
        DD.create(new Date());
        res.status(201).json({
            visitCount: visitorExists.visitCount + 1,
            _id: visitorExists._id,
            name: visitorExists.name,
            email: visitorExists.email,
            token: generateToken(visitor._id),
        });
    } else {
        res.status(400);
        throw new Error("Adding Visitor Failed");
    }
  } else {
    const user = await Visit.create({
        name,
        email
      });    
      if (user) {
        res.status(201).json({
          visitCount: user.visitCount,
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("User not found");
      }
  }  
});

export { registerVisitor };

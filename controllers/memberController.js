import asyncHandler from "express-async-handler";
import Member from "../models/memberModel.js";

//@description     Add new member
//@route           POST /api/members/
//@access          Public
const addMember = asyncHandler(async (req, res) => {
  const { name, email, position, department, pic, year, linkedin, startYear, endYear } = req.body;
  console.log(res.body);
  
  const memberExists = await Member.findOne({ email });

  if (memberExists) {
    res.status(404);
    throw new Error("Member has already been added!!");
  }

  const member = await Member.create({
    name,
    email,
    position,
    department,
    pic,
    year,
    linkedin,
    period: startYear + " - " + endYear.slice(2)
  });

  if (member) {
    res.status(201).json({
      _id: member._id,
      name: member.name,
      email: member.email,
      position: member.position,
      department: member.department,
      pic: member.pic,
      year: member.year,
      linkedin: member.linkedin,
      period: member.period
    });
  } else {
    res.status(400);
    throw new Error("Member not found");
  }
});

//@description     Delete single Member
//@route           DELETE /api/members/:id
//@access          Private
const DeleteMember = asyncHandler(async (req, res) => {

  const ID = req.params.id;
  const member = await Member.findById(ID);

  if (member) {
    await member.remove();
    res.json({ message: "Member Removed" });
  } else {
    res.status(404);
    throw new Error("Member not Found");
  }
});

// @desc    GET member profile
// @route   GET /api/members/profile
// @access  Private
const updateMemberProfile = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.body.id);
  let getPeriod = null;
  if(req.body.startYear && req.body.endYear) {
    getPeriod = req.body.startYear + " - " + req.body.endYear.slice(2);
  }
  if (member) {
    member.name = req.body.name || member.name;
    member.email = req.body.email || member.email;
    member.position = req.body.position || member.position;
    member.department = req.body.department || member.department;
    member.year = req.body.year || member.year;
    member.linkedin = req.body.linkedin || member.linkedin;
    member.pic = req.body.pic || member.pic;
    member.period = getPeriod || member.period;

    const updatedMember = await member.save();

    res.json({
      _id: updatedMember._id,
      name: updatedMember.name,
      email: updatedMember.email,
      pic: updatedMember.pic,
      position: updatedMember.position,
      department: updatedMember.department,
      year: updatedMember.year,
      linkedin: updatedMember.linkedin,
      period: updatedMember.period
    });
  } else {
    res.status(404);
    throw new Error("Member Not Found");
  }
});

const formatMembers = (data) => {
    const obj = {
      "Secretary": [],
      "Joint Secretary": [],
      "Treasurer": [],
      "Event Manager": [],
      "Editing Team": []
    };
    for(let element of data) {
      if(obj.hasOwnProperty(element.position)) {
        obj[element.position].push(element);
      } else {
        obj[element.position] = [];
        obj[element.position].push(element);
      }
    }
    const formattedData = Object.entries(obj)
    .filter(([key, members]) => members.length > 0)
    .map(([key, members]) => ({
      id: key,
      members: members
    }));
    return formattedData;
};

// @desc    Get member details
// @route   GET /api/members
// @access  Private
const getMembers = asyncHandler(async (req, res) => {
  const members = await Member.find();
  res.json(formatMembers(members));
});

//@description     Fetch single Member
//@route           GET /api/members/:id
//@access          Public
const getMemberById = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);

  if(!member) {
    res.status(404).json({ message: "Member doesn't exist" });
  } else {
    res.json(member);
  }
  
});

// @desc    Get member details based on year
// @route   GET api/members/year/:year
// @access  Public
const getMemberByYear = asyncHandler(async (req, res) => {    
  const year = req.params.year.replace('-', ' - ');
  const member = await Member.find({ period: year });

  if(!member) {
    res.status(404).json({ message: "Member not found" });
  } else {
    res.json(formatMembers(member));
  }
  
});

//@description     Fetch all the Board Member Years
//@route           GET /api/members/years/
//@access          Public
const getMemberYears = asyncHandler(async (req, res) => { 
    const years = await Member.find({}, 'period');
    const yearList = years.map(year => year.period).sort();

    const newArray = yearList.reduce((acc, curr) => {
      const existingYear = acc.find((elem) => elem.year == curr);
      if (existingYear) {
        existingYear.count += 1;
      } else {
        acc.push({id: (acc.length + 1).toString(), year: curr, count: 1});
      }
      return acc;
    }, []);
  
    if(!years) {
      res.status(404).json({ message: "No data found" });
    } else {
      res.json(newArray);
    }
    
});


export { getMemberById, getMemberYears, getMemberByYear, updateMemberProfile, addMember, DeleteMember, getMembers };

const express=require('express')
const User = require('../models/User')
const router=express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET="secret@123";

//Route 1:creating a user using post ... no login required   /api/auth/createuser
router.post('/createuser',
    body('password','password must be atleast 5 characters').isLength({ min: 5 }),
   body('name','minimum length is 3 characters').isLength({ min: 3 }) ,
   body('email').isEmail()

, async (req,res)=>{
  let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        let user=await User.findOne({email:req.body.email})
        if(user){
            return  res.status(400).json({success,error:"sorry the user with this email exists"})
        }
        const salt=await bcrypt.genSalt(10)
       const secPass= await  bcrypt.hash(req.body.password,salt)
         user=await User.create({
            name: req.body.name,
            password: secPass,
            email:req.body.email
          })
          const data={
            user:{
              id:user.id
            }
          }
 
          const authtoken=jwt.sign(data,JWT_SECRET)
          success=true;
          res.json({success,authtoken:authtoken})
          // console.log(req.user.id)
    }
    catch(err){
        console.error(err)
        res.status(500).send("some error occur")
    }
    
})

//Route 2:Authenticate a user using post ... no login required   /api/auth/login
router.post('/login',
body('password').exists(),
   body('email').isEmail()
   , async (req,res)=>{
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try {
     let user=await User.findOne({email:email})
     if(!user){
     return res.json({success,error:"enter correct credentials"})
     }
     let passwordCompare=await bcrypt.compare(password,user.password)
     if(!passwordCompare){

      return res.json({success,error:"enter correct credentials"})
     }
     const data={
      user:{
        id:user.id
      }
    }
  const authtoken=jwt.sign(data,JWT_SECRET)
  success=true;
  res.json({success,authtoken:authtoken})
    } 
    catch (error) {
      console.error(error)
      res.status(500).send("some error occur")
    }
  }
)

//Route 3:get login user details using post ...  login required   /api/auth/getuser


router.post('/getuser',fetchuser, async (req,res)=>{
  try {
    const userId=req.user.id;
    
   const user=await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error)
    res.status(500).send("some error occur")
  }
})
module.exports=router
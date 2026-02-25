const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {protect} = require("../middleware/authMiddleware")
const router = express.Router();

// route POST /api/users/register
//desc Register a new user
//@access Public
router.post("/register", async (req,res, next) => {
    const {name, email, password} = req.body;

    try{
        //Registeration logic
        let user = await User.findOne({email});

        if(user) return res.status(400).json({message: "User already exists"});
        user = new User({name,email, password});
        await user.save();
        //Create JWT payload.
        const payload= { user: {id: user._id, role: user.role}};
        
        // Use Promise-based jwt.sign for Express 5 compatibility
        const token = await new Promise((resolve, reject) => {
            jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "40h"}, (err, token) => {
                if(err) reject(err); 
                resolve(token);
            });
        });
        
        //Send the user and token in response
        res.status(201).json({
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role: user.role,
            },
            token,
        });
       
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
});

// route POST/api/users/login
//desc Authenticate user and get token
//access Public
router.post("/login",async(req,res, next) =>{
    const {email,password} = req.body;

    console.log("Login attempt for:", email);
    
    try{
        if(!email || !password) {
            return res.status(400).json({message: "Please provide email and password"});
        }
        
        let user = await User.findOne({email});
        console.log("User found:", user);

        if(!user) {
            return res.status(400).json({message: "Invalid Credentials"});
        }
        
        const isMatch = await user.matchPassword(password);
        console.log("Password match:", isMatch);

        if(!isMatch) 
            return res.status(400).json({message:"Invalid Credentials"});

        //Create JWT payload.
        const payload= { user: {id: user._id, role: user.role}};
        console.log("JWT Payload:", payload);
        console.log("JWT Secret:", process.env.JWT_SECRET ? "exists" : "MISSING");
        
        // Use Promise-based jwt.sign for Express 5 compatibility
        const token = await new Promise((resolve, reject) => {
            jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "40h"}, (err, token) => {
                if(err) {
                    console.error("JWT Sign Error:", err);
                    reject(err);
                } 
                resolve(token);
            });
        });
        
        console.log("Token generated successfully");
        //Send th euser and token in response
        res.json({
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role: user.role,
            },
            token,
        });
    } catch(error){
        console.error("Login Error:", error);
        res.status(500).json({message: "Server Error", error: error.message});
    }
});

//@ route GET /api/users/profile
//desc GEt logged-in user's profile 
//@ access Private.

router.get("/profile", protect, async ( req,res)=>{
    res.json(req.user);
}); 
module.exports = router;
const asyncHandler = require("express-async-handler")
const User = require("../models/userModal")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// @desc Register  a user
// @route POST api/users/register 
// @access public
const registeruser = asyncHandler(async (req, res) => {
    console.log("Register function called");
    const { username, email, password } = req.body
    console.log("Request body:", req.body);

    if (!username || !email || !password) {
        console.log("Missing fields");
        res.status(400);
        throw new Error("All Fields mandatory!")
    }
    
    const userAlreadyAvailable = await User.findOne({ email })
    if (userAlreadyAvailable) {
        console.log("User already exists");
        res.status(400);
        throw new Error("User already exists!") 
    }
    console.log("Starting password hash");
    //sabse pehle hashing karni hogi password ki
    let hashedpassword; // Declare outside try/catch to make it accessible later
    try {
         hashedpassword = await bcrypt.hash(password, 10);// bcrypt also promises provideer
        console.log("Hashed pass:", hashedpassword)
    } catch (error) {
        console.log("Hashing error:", error);
        res.status(500);
        throw new Error("Password hashing failed");
    }
    const user = await User.create({
        username,
        email,
        password: hashedpassword,
    })
    console.log(`Our user: ${user}`)
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is invalid")
    }

})

// @desc Login a user
// @route POST api/users/login
// @access Public
const loginuser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error("Please add all details")
    }
    const user = await User.findOne({ email })
       console.log("Ye raha user",user)
    //compare password
    if (user && (await bcrypt.compare(password, user.password))) {
        console.log("We are here")
        // if this condition then paas the token to user
        const accessToken = jwt.sign(
            {
        // payload hai ye user wala key val pair 
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
            },
            process.env.ACCESS_TOKEN_KEY,// 2nd pproperty 
            {expiresIn:"15m"}
        )
        console.log("We are here as well")
        res.status(200).json({ accessToken })
        // ab token access karke we can access all privae routes, so we will make our routes private firstly
    } else {
        res.status(401);
        throw new Error("Email or password not valid")
    }

})

// @desc Current user info
// @route POST api/users/current
// @access private 
//yaha client has to paas access token 
const currentuser = asyncHandler(async (req, res) => {
    res.json(req.user); //this will send the requested token's user's details
})


module.exports ={ registeruser,loginuser,currentuser}
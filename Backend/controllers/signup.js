const User = require("../models/user");

async function handleSignUp(req, res)  {
    try {
      const { fullname , email, password } = req.body;
        // console.log("signup post request contains ",req.body,"\n");
      
      // Check if the email or username already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // console.log("Signup Existing User!");
        return res.status(400).send({message: "User already exists!" });
      }
  
      // Create a new user
      const newUser = await User.create({
        fullname,
        email,
        password,
      });
      console.log("signup Sucessfull",newUser);
      // Redirect to home page or login page after successful signup
      return res.status(201).send({message: "User created successfully!" ,success:true});  
    } catch (err) {
      console.error("Error during signup:", err);
  
      // Render an error page or show a specific error message
      return res.status(500).send({ message: "Something went wrong. Please try again." });
    }
  };
  module.exports = {
    handleSignUp,
  };
  
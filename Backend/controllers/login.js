const User = require("../models/user");


async function handleLogin(req, res){
    try {
      const { email, password } = req.body;
      //genrateing token 
      const token = await User.matchPasswordAndGenerateToken(email, password);

        // If authentication fails
    if (!token) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }
    // If authentication succeeds
      res.cookie("token" , token);
      console.log("Login Successfull" );
      // Redirect to home page or dashboard after successful login
      console.log("Login Successful");
      return res.status(200).send({message: `Welcome back!` , success:true});                

  } catch (err) {
    console.error("Error during login:", err.message);

    return res.status(500).json({ message: err.message, success: false });
  }
}
module.exports = {handleLogin};
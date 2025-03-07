const mongoose = require("mongoose");
const crypto = require('crypto');
const { createTokenForUser } = require("../services/authentication.js");
const path = require('path');
// Defining Schema
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: { 
      type: String, 
      default: "/images/default-profile.png" },
  },
  { timestamps: true }
);

// Pre-save hook for hashing the password
userSchema.pre("save", function (next) {
  const user = this; // Reference to the current document
  console.log("Before hashing: ", user);

  // Only hash the password if it has been modified or is new
  if (!user.isModified("password")) return next() ;

  try {
    // Generate a random salt
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto
    .createHmac('sha256' , salt) //(type , secretkey)
    .update(user.password)
    .digest('hex');
    
    user.salt = salt;
    // salt is like a secret for each user of 16 digit ki  
    // Hash the password using the salt
    user.password = hashedPassword;
    console.log("after User : " ,user);
    return next();
  } catch (err) {
    console.log("Error in Scheme Pre:" , err);
    next(err);
  }
});

//SE PDF NOTES WHY WE USE STATIC METHOD OF MONGOOSE SCHEME INSTEAD OF SEPARE VALIDATE FUNCT FOR PASS
// Static Method for Password Validation and Token Generation
userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
  try {
    const user = await this.findOne({ email });
    if (!user) return null; // Return null instead of throwing an error

    // Hash the provided password using stored salt
    const userProvidedHash = crypto.createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");

    // Compare stored hash with provided hash
    if (user.password !== userProvidedHash) return null; // Return null if password is incorrect

    // Generate Token
    return createTokenForUser(user);
  } catch (error) {
    console.error("Error in password validation:", error.message);
    return null;
  }
});


const User = mongoose.model("user", userSchema);

module.exports = User;

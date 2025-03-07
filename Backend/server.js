const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
require("dotenv").config();
const {connectMongoDB} = require('./connection.js');

const app = express();

const server = http.createServer(app);

//connect MongoDB
connectMongoDB(process.env.MONGO_URL).then((result) => {
    console.log("DataBase Connected SuccessFully!");
})
.catch((err) => {
    console.log("Database Can't Connect Error:", err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


//Cokies handling
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication.js");

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthenticationCookie("token"));

//Adding routers

const userRouter = require("./routes/userRouter.js");
app.use("/user" , userRouter);



const port = process.env.PORT || 5000;

app.listen(port, () => { 
  console.log(`Server is running on http://localhost:${port}`);
});

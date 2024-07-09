//Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//Load dependencies
const express = require("express");
const connectToDb = require("./config/dbconnect");
const noteRouter= require("./routes/note.route.js");
const usersController=require("./controllers/users.controller.js");
const cookieParser= require("cookie-parser");
const requireAuth=require("./middleware/requireAuth.js")

//Create express app
const app = express();
const cors=require("cors");


//Configure express app
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true,
}));

//Connect to database
connectToDb();


//Routing
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/signup",usersController.signup);
app.post("/login",usersController.login);
app.get("/logout",usersController.logout);
app.get("/check-auth",requireAuth, usersController.checkAuth);
app.use("/notes",noteRouter);


app.listen(process.env.PORT,()=>{
  console.log("Connection to port successfull")
});


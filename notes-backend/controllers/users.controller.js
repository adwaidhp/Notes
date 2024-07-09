const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

async function signup(req, res) {
  try {
    //Get the email and password off req body
    const { email, password } = req.body;
    //Hash Password
    const hashedPassword = bcrypt.hashSync(password, 8);
    //Create account
    await User.create({ email, password: hashedPassword });
    //Respond
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}
async function login(req, res) {
  try {
    //Get the email and password off req body
    const { email, password } = req.body;
    //Find the user with requested email
    const user = await User.findOne({ email: email });
    if (!user) return res.sendStatus(400);
    //Compare sent in password with found user password hash
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return res.sendStatus(401);
    //Create a jwt token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);
    //Set the cookie
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    //Send it
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
}
function logout(req, res) {
  try {
    res.clearCookie("Authorization");
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

function checkAuth(req, res) {
  try {
    console.log(req.user);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}
module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};

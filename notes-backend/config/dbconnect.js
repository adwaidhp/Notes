const mongoose = require("mongoose");
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
  }
async function connectToDb() {
  await mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Connection to database successfull.. ");
  })
  .catch(()=>{console.log('Connection to database failed..')})
}
module.exports = connectToDb;

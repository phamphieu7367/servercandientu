const { default: mongoose } = require("mongoose");

const url =
  "mongodb+srv://candientu:candientu12@candientu.ckyopfs.mongodb.net/?retryWrites=true&w=majority";
// const url =
//   "mongodb+srv://nguyenSon:Son862001@cluster0.dgah05x.mongodb.net/?retryWrites=true&w=majority";
const dbConnect = () => {
  try {
    const conn = mongoose.connect(url);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Databser error");
  }
};

module.exports = dbConnect;

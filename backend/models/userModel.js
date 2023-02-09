const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    UserName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Name: { type: String, required: true },
    // Gender: { type: Boolean, required: true },
    DateOfBirth: { type: Date, required: true },
    Cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    WishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    // CoursePurchased: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
    // CoursePosted: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    Timestamp: true,
  }
);
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.Password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10); //10 rounds
  this.Password = await bcrypt.hash(this.Password, salt);
});
const User = mongoose.model("User", userSchema);
module.exports = User;

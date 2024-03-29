const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Name: { type: String, required: true },
    IsTeacher: { type: String, default: "STUDENT", trim: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    // Gender: { type: Boolean, required: true },
    DateOfBirth: { type: Date, required: true },
    Cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      },
    ],
    WishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      },
    ],
    CoursePurchased: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    CoursePosted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    Comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      }
    ],
    FavoriteType: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Type",
      }
    ],
    IsVerified: {
      type: Boolean,
      default: false,
    },
    Role: {
      type: String,
      default: "user",
    },

    Balance: {
      type: Number,
      trim: true,
      default: 0,
    },
    HistoryMCA: [
      {
        Date: { type: Date, default: Date.now },
        Amount: { type: Number, default: 0 },
        AmountAfter: { type: Number, default: 0 },
        Description: { type: String, default: '' },
        IsAdd: { type: Boolean }
      }
    ],
    BankAccount:{
        BankName: String,
        BankNumber: String,
    },
  },
  {
    timestamp: true,
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

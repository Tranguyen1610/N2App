const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
        },
        otp: {
            type: String,
        },
        time: {
            type: Date,
            default: Date.now(),
            index: { expires: 300 }
        }
    }
)
const Otp = mongoose.model("Otp", userSchema);
module.exports = Otp;

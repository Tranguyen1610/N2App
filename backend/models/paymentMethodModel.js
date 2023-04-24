const mongoose= require("mongoose");

const typeSchema = mongoose.Schema(
    {
        Name: { type: String, trim: true, },
        Logo:{type:String,trim:true, },
        Description: { type: String, trim: true },
    }
);
const PaymentMethod = mongoose.model("PaymentMethod",typeSchema);
module.exports = PaymentMethod;
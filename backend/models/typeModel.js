const mongoose= require("mongoose");

const typeSchema = mongoose.Schema(
    {
        Name: { type: String, trim: true },
        IsHighLight:{type:Boolean,default:false},
        IsShowInApp:{type:Boolean,default:false},
        
    }
);
const Type = mongoose.model("Type",typeSchema);
module.exports = Type;
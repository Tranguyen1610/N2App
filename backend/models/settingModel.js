const mongoose= require("mongoose");

const settingSchema = mongoose.Schema(
    {
        Name:{type:String, trim: true},
        Fee:{type:Number,default:10},
        
    }
);
const Setting = mongoose.model("Setting",settingSchema);
module.exports = Setting;
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        IsDeleted:{type:Boolean,default:false},
        PayMentType:{ type: String,default:"",trim:true },
        MoneyTotal:{type:Number,default:0,require:true},
        MoneyFinal:{type:Number,default:0,require:true},
        CodeDiscount:{ type: String,default:"",trim:true },
        CreatedAt:{type:Number,default:0,require:true},
        User:{type: mongoose.Schema.Types.ObjectId,ref:"User"},
        Detail:[
            {type: mongoose.Schema.Types.ObjectId,ref:"OrderDetail"}
        ]
        

    }
)
const Order = mongoose.model("Order",orderSchema);
module.exports = Order;
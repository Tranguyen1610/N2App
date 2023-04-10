const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        Status:{ type: String,default:"",trim:true },
        IsDeleted:{type:Boolean,default:false},
        PayMentStatus:{ type: String,default:"",trim:true },
        PayMentType:{ type: String,default:"",trim:true },
        MoneyTotal:{type:Number,default:0,require:true},
        MoneyFinal:{type:Number,default:0,require:true},
        CodeDiscount:{ type: String,default:"",trim:true },
        CreatedAt:{type:Number,default:0,require:true},
        Course:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Course"
            },
        ],
        User:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        ]

    }
)
const Order = mongoose.model("Order",orderSchema);
module.exports = Order;
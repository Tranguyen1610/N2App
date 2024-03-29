const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        IsDeleted:{type:Boolean,default:false},
        PayMentType:{ type: mongoose.Schema.ObjectId, ref:"PaymentMethod" },
        MoneyTotal:{type:Number,default:0,require:true},
        MoneyFinal:{type:Number,default:0,require:true},
        CodeDiscount:{ type: String,default:"",trim:true },
        BuyerId:{type: mongoose.Schema.Types.ObjectId,ref:"User"},
        // Detail:[
        //     {type: mongoose.Schema.Types.ObjectId,ref:"OrderDetail"}
        // ]
        Detail:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
        ],
        IsPayment:{type:Boolean,default:false},
        IsCancel:{type:Boolean,default:false},
    },
    { timestamps: true }
)
const Order = mongoose.model("Order",orderSchema);
module.exports = Order;
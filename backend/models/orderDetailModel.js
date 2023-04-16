const mongoose = require("mongoose");

const orderDetailSchema = mongoose.Schema(
    {
        CourseId:{type: mongoose.Schema.Types.ObjectId,ref:"Course"},        
    }
)
const OrderDetail = mongoose.model("OrderDetail",orderDetailSchema);
module.exports = OrderDetail;
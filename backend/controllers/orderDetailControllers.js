const asyncHandler = require("express-async-handler");
const OrderDetail = require("../models/orderDetailModel");

const createOrderDetail = asyncHandler(async(req,res)=>{
    try{
        
        

    }catch(error){
        res.status(400).send(error.message || error);
    }
})
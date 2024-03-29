const asyncHandler = require("express-async-handler");
const Type = require("../models/typeModel");


const addType = asyncHandler(async (req, res) => {
    const { Name} = req.body;
  
    if (!Name) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
    const type = Type.create({
      Name,
    });
    if (type) {
      res.status(200).json({
        _id: type._id,
        Name: type.Name,
        IsHighLight:type.IsHighLight,
        IsShowInApp:type.IsShowInApp,
      });
    } else {
      res.status(400);
      throw new Error("Video not found");
    }
  });

  const allTypes = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { Name: { $regex: req.query.search, $options: "i" } },
            // { Email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    // console.log("abc");
    const types = await Type.find(keyword);
    res.send(types);
  });
  module.exports={addType,allTypes}
const asyncHandler = require("express-async-handler");
const Setting = require("../models/settingModel");


const addSetting = asyncHandler(async (req, res) => {
    const { Name,Fee} = req.body;
  
    if (!Name && !Fee) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
    const setting = Setting.create({
      Name,Fee
    });
    if (setting) {
      res.status(200).json({
        _id: setting._id,
        Name: setting.Name,
        Fee: setting.Fee,
      });
    } else {
      res.status(400);
      throw new Error("Setting not found");
    }
  });

  const allSettings = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { Name: { $regex: req.query.search, $options: "i" } },
            // { Email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    // console.log("abc");
    const settings = await Setting.find(keyword);
    res.send(settings);
  });

  const updateSetting = asyncHandler(async (req, res) => {
    const setting = await Setting.findOneAndUpdate(
      {Name: req.body.Name},
      { Fee: req.body.Fee },
      { new: true }
    );
    if (setting) {
      res.json({
        _id: setting._id,
        Name: setting.Name,
        Fee: setting.Fee,
      });
    } else {
      res.status(400);
      throw new Error("Setting not found");
    }
  })
  
  const findByName = asyncHandler(async (req, res) => {
    const setting = await Setting.findOne({Name:req.params.name});
    res.send(setting);
  });

  module.exports={addSetting,allSettings,updateSetting,findByName}
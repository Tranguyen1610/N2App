const asyncHandler = require("express-async-handler");
const Content = require("../models/contentModel");


const addContent = asyncHandler(async (req, res) => {
    const { Name,Key} = req.body;
  
    if (!Name && !Key) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
    const content = await Content.create({
      Name,
      Key,
    });
    if (content) {
      console.log(content);
      res.status(200).json({
        _id: content._id,
        Name: content.Name,
        Key: content.Key,
      });
    } else {
      res.status(400);
      throw new Error("Content not found");
    }
  });

  const allContents = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { Name: { $regex: req.query.search, $options: "i" } },
            // { Email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    // console.log("abc");
    const contents = await Content.find(keyword);
    res.send(contents);
  });
  module.exports={addContent,allContents}
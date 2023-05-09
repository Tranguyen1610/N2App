const mongoose= require("mongoose");

const contentSchema = mongoose.Schema(
    {
        Name: { type: String, trim: true },
        Key: { type: String, trim: true },
    }
);
const Content = mongoose.model("Content",contentSchema);
module.exports = Content;
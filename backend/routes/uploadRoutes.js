const express = require("express");
const cloudinary = require("../config/cloudinary")
const uploader = require("../config/multer");

const router = express.Router();

router.post("/", uploader.single("file"), async (req, res) => {
	try {
		const upload = await cloudinary.uploader.upload(req.file.path,{
			upload_preset:'N2App',
			resource_type:'auto'
		});
		return res.json({
			success: true,
			file: upload.secure_url,
		});
	} catch (error) {
		return res.json({
			success: false,
			error: error,
		});
	}

});
module.exports = router;
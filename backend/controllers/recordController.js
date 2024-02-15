 
const record = require('../models/recordCollection')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')
 

 
exports.getRecordCollection = async (req, res, next) => {
	const recordC = await record.find();
	if (!recordC) {
		return res.status(404).json({
			success: false,
			message: 'Products not found'
		})
	}
	res.status(200).json({
		success: true,
		recordC
	})

}
  
 
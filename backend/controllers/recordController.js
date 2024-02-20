 
const record = require('../models/recordCollection')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')
 

exports.getRecordCollection = async (req, res, next) => {
	// const products = await Product.find({});
	const resPerPage = 4;
	const productsCount = await record.countDocuments();
	const apiFeatures = new APIFeatures(record.find(), req.query).search().filter()
	apiFeatures.pagination(resPerPage);
	const products = await apiFeatures.query;
	const filteredProductsCount = products.length
	if (!products) {
		return res.status(404).json({
			success: false,
			message: 'No Products'
		})
	}
	res.status(200).json({
		success: true,
		count: products.length,
		productsCount,
		products,
		resPerPage,
		filteredProductsCount,
	})
}

 
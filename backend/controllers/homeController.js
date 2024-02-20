const homeCollection = require('../models/homeCollection')
// const Order = require('../models/order')
// const APIFeatures = require('../utils/apiFeatures')


exports.newTopic = async (req, res, next) => {

	const homeTopic = await homeCollection.create(req.body);
	if (!homeTopic)
		return res.status(400).json({
			success: false,
			message: 'FAILED TO CREATE TOPIC'
		})
	res.status(201).json({
		success: true,
		homeTopic
	})
}

exports.getSingleTopic = async (req, res, next) => {
	const topic = await homeCollection.findById(req.params.id);
	if (!material) {
		return res.status(404).json({
			success: false,
			message: 'NO TOPIC FOUND'
		})
	}
	res.status(200).json({
		success: true,
		topic
	})
}
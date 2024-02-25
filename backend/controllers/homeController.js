const homeCollection = require('../models/homeCollection')
const peanutshellCollection = require('../models/types/peanutshellCollection')
const mulchingCollection =  require('../models/types/mulchingCollection')
const peanutshellmulchingCollection = require('../models/types/peanutshellmulchingCollection')
const benefitsCollection = require('../models/types/benefitsCollection')
// const Order = require('../models/order')
// const APIFeatures = require('../utils/apiFeatures')


exports.newType = async (req, res, next) => {

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

exports.newTopic = async (req, res, next) => {

	try {
        const typeTopic = await homeCollection.findById(req.params.id);

        if (!typeTopic) {
            return res.status(404).json({ success: false, error: 'TYPE NOT FOUND' });
		}

		if (typeTopic.types == "PS")
		{
			const peanutshell = await peanutshellCollection.create({
                types: req.params.id,
                topic: req.body.topic,
				description: req.body.description,
            });

			return res.status(201).json({
                success: true,
                peanutshell
            });
		}

		else if (typeTopic.types == "M")
		{
			const mulching = await mulchingCollection.create({
                types: req.params.id,
                topic: req.body.topic,
				description: req.body.description,
            });

			return res.status(201).json({
                success: true,
                mulching
            });
		}

		else if (typeTopic.types == "PSM")
		{
			const peanutshellmulching = await peanutshellmulchingCollection.create({
                types: req.params.id,
				topic: req.body.topic,
				description: req.body.description,
            });

			return res.status(201).json({
                success: true,
                peanutshellmulching
            });
		}

		else if (typeTopic.types == "B")
		{
			const benefits = await benefitsCollection.create({
                types: req.params.id,
				topic: req.body.topic,
				description: req.body.description,
            });

			return res.status(201).json({
                success: true,
                benefits
            });
		}

		else
		{
			return res.status(404).json({ success: false, error: 'TYPE NOT FOUND' });
		}

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'FAILED TO CREATE TOPIC',
            error: error.message
        });
    }

}


exports.getAllHome = async (req, res, next) => {
    try {
        const benefits = await benefitsCollection.find();
        const mulching = await mulchingCollection.find();
        const peanutshell = await peanutshellCollection.find();
        const peanutshellmulching = await peanutshellmulchingCollection.find();

        res.status(200).json({
            success: true,
            benefits,
            mulching,
            peanutshell,
            peanutshellmulching
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching topics',
            error: error.message
        });
    }
};


exports.getTopics = async (req, res, next) => {
	const topic = await homeCollection.find();
	if (!topic) {
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
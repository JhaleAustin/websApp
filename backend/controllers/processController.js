 
const processCollection = require('../models/processCollection');
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')
 
// exports.getProcess = async (req, res, next) => {

// 	const resPerPage = 4;
// 	const ProcesssCount = await processCollection.countDocuments();
// 	const apiFeatures = new APIFeatures(Process.find(), req.query).search().filter()
// 	apiFeatures.pagination(resPerPage);
// 	const Processs = await apiFeatures.query;
// 	const filteredProcesssCount = Processs.length
// 	if (!Processs) {
// 		return res.status(404).json({
// 			success: false,
// 			message: 'No Processs'
// 		})
// 	}
// 	res.status(200).json({
// 		success: true,
// 		count: Processs.length,
// 		ProcesssCount,
// 		Processs,
// 		resPerPage,
// 		filteredProcesssCount,
// 	})
// }

exports.getAllProcess = async (req, res, next) => {
    try {
        const process = await processCollection.find();

        res.status(200).json({
            success: true,
            process
        });
    } catch (error) {
        res.status(500).json({
   
			success: false,
            message: 'ERROR FETCHING PROCESS',
            error: error.message
        });
    }
};

exports.getProcess = async (req, res, next) => {
    try {
        const process = await processCollection.find();

        res.status(200).json({
            success: true,
            process
        });
    } catch (error) {
        res.status(500).json({
   
			success: false,
            message: 'ERROR FETCHING PROCESS',
            error: error.message
        });
    }
};

exports.getSingleProcess = async (req, res, next) => {
	const process = await processCollection.findById(req.params.id);
	if (!process) {
		return res.status(404).json({
			success: false,
			message: 'STEP NOT FOUND'
		})
	}
	res.status(200).json({
		success: true,
		process
	})
}

exports.deleteProcess = async (req, res, next) => {
	
	const process = await processCollection.findByIdAndDelete(req.params.id);
	
	if (!process) {
        return res.status(404).json({ message: `NO PROCESS FOUND IN THIS ID` })

    }

    res.status(200).json({
        success: true
    })
}


exports.newProcess = async (req, res, next) => {
     const { title, content } = req.body;

	const process = await processCollection.create(req.body);
	if (!process)
		return res.status(400).json({
			success: false,
			message: 'Process not created'
		})
	res.status(201).json({
		success: true,
		process
	})

};


exports.updateProcess = async (req, res, next) => {

    const { title, content } = req.body;

    try {
        let process = await processCollection.findById(req.params.id);

        if (!process) {
            return res.status(404).json({ success: false, error: 'TOPIC NOT FOUND' });
        }

        process.title = title;
        process.content = content;

        process = await process.save();

        if (!process) {
            return res.status(400).json({
                success: false,
                message: 'FAILED TO UPDATE STEP INFORMATION'
            });
        }

        res.status(201).json({
            success: true,
            process
        });
    } catch (error) {
        // Handle any potential errors here
        console.error('ERROR UPDATING STEP INFORMATION: ', error);
        res.status(500).json({
            success: false,
            message: 'INTERNAL SERVER ERROR'
        });
    }
}

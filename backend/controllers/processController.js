 
const Process = require('../models/processCollection')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')
 
exports.getProcess = async (req, res, next) => {

	const resPerPage = 4;
	const ProcesssCount = await Process.countDocuments();
	const apiFeatures = new APIFeatures(Process.find(), req.query).search().filter()
	apiFeatures.pagination(resPerPage);
	const Processs = await apiFeatures.query;
	const filteredProcesssCount = Processs.length
	if (!Processs) {
		return res.status(404).json({
			success: false,
			message: 'No Processs'
		})
	}
	res.status(200).json({
		success: true,
		count: Processs.length,
		ProcesssCount,
		Processs,
		resPerPage,
		filteredProcesssCount,
	})
}

exports.getSingleProcess = async (req, res, next) => {
	const Process = await Process.findById(req.params.id);
	if (!Process) {
		return res.status(404).json({
			success: false,
			message: 'Process not found'
		})
	}
	res.status(200).json({
		success: true,
		Process
	})
}

exports.deleteProcess = async (req, res, next) => {
	const Process1 = await Process.findByIdAndDelete(req.params.id);
	if (!Process1) {
		return res.status(404).json({
			success: false,
			message: 'Process not found'
		})
	}

	res.status(200).json({
		success: true,
		message: 'Process deleted'
	})
}

exports.newProcess = async (req, res, next) => {
    const { title, content } = req.body;
    const { file } = req; // Assuming the video file is attached to the request

	console.log(file);

    try {
        const result = await cloudinary.uploader.upload_large(`${file.path}`, {
            folder: 'Process',
            resource_type: 'Video',
        });

        const videoLink = {
            public_id: result.public_id,
            url: result.secure_url,
        };

		console.log('Video Link:', result);

        // Create new process with the single videoLink
        const newProcess = new Process({
            title,
            content,
            videos: videoLink,
        });

        // Save the process to the database
        const savedProcess = await newProcess.save();

        // Return success response
        res.status(201).json({
            success: true,
            process: savedProcess,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'INTERNAL SERVER ERROR',
        });
    }
};



exports.updateProcess = async (req, res, next) => {
	let Process = await Process.findById(req.params.id);
	// console.log(req.body)
	if (!Process) {
		return res.status(404).json({
			success: false,
			message: 'Process not found'
		})
	}
	let images = []

	if (typeof req.body.images === 'string') {
		images.push(req.body.images)
	} else {
		images = req.body.images
	}
	if (images !== undefined) {
		// Deleting images associated with the Process
		for (let i = 0; i < Process.images.length; i++) {
			try {
				let imageDataUri = Process.images[i]
			const result = await cloudinary.v2.uploader.destroy(`${imageDataUri.public_id}`)
			} catch (error) {
				console.log(error)
			}
		}
	}
	let imagesLinks = [];
	for (let i = 0; i < images.length; i++) {
		try {
			let imageDataUri = images[i]
		const result = await cloudinary.v2.uploader.upload(`${imageDataUri}`, {
			folder: 'Processs',
			width: 150,
			crop: "scale",
		});
		imagesLinks.push({
			public_id: result.public_id,
			url: result.secure_url
		})
		} catch (error) {
			console.log(error)
		}
		

	}

	
	req.body.images = imagesLinks
	Process = await Process.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindandModify: false
	})
	if (!Process)
		return res.status(400).json({
			success: false,
			message: 'Process not updated'
		})
	// console.log(Process)
	return res.status(200).json({
		success: true,
		Process
	})
}

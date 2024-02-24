 
const Documentation = require('../models/docuCollection')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')
 

// exports.getDocuCollection = async (req, res, next) => {
// 	 record.find({}).then(function(Docu){
// 		res.json(Docu)

// 	 }).catch(function(err){
// 		res.json(err)
// 	 })
// }


exports.getDocumentation = async (req, res, next) => {
	  const Documentations = await Documentation.find({});
	
 if (!Documentations) {
		return res.status(404).json({
			success: false,
			message: 'No Documentations'
		})
	}
	res.status(200).json({
		success: true,
		Documentations,
		 })
}



exports.getDocumentations = async (req, res, next) => {
	// const Documentations = await Documentation.find({});
	const resPerPage = 4;
	const DocumentationsCount = await Documentation.countDocuments();
	const apiFeatures = new APIFeatures(Documentation.find(), req.query).search().filter()
	apiFeatures.pagination(resPerPage);
	const Documentations = await apiFeatures.query;
	const filteredDocumentationsCount = Documentations.length
	if (!Documentations) {
		return res.status(404).json({
			success: false,
			message: 'No Documentations'
		})
	}
	res.status(200).json({
		success: true,
		count: Documentations.length,
		DocumentationsCount,
		Documentations,
		resPerPage,
		filteredDocumentationsCount,
	})
}

exports.getSingleDocumentation = async (req, res, next) => {
	const Documentation = await Documentation.findById(req.params.id);
	if (!Documentation) {
		return res.status(404).json({
			success: false,
			message: 'Documentation not found'
		})
	}
	res.status(200).json({
		success: true,
		Documentation
	})
}

// exports.updateDocumentation = async (req, res, next) => {
// 	let Documentation = await Documentation.findById(req.params.id);
// 	console.log(req.body)
// 	if (!Documentation) {
// 		return res.status(404).json({
// 			success: false,
// 			message: 'Documentation not found'
// 		})
// 	}
// 	Documentation = await Documentation.findByIdAndUpdate(req.params.id, req.body, {
// 		new: true,
// 	})
// 	if (!Documentation) {
// 		return res.status(404).json({
// 			success: false,
// 			message: 'Documentation not updated'
// 		})
// 	}
// 	res.status(200).json({
// 		success: true,
// 		Documentation
// 	})
// }

exports.deleteDocumentation = async (req, res, next) => {
	const documentation = await Documentation.findByIdAndDelete(req.params.id);
	if (!documentation) {
		return res.status(404).json({
			success: false,
			message: 'Documentation not found'
		})
	}

	res.status(200).json({
		success: true,
		message: 'Documentation deleted'
	})
}



exports.newDocumentation = async (req, res, next) => {
	if (!req.body.images) {
        return res.status(400).json({ message: 'Images array is missing in the request body' });
    }
	let images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    
	let videos = []
	if (typeof req.body.images === 'string') {
		images.push(req.body.images)
	} else {
		images = req.body.images
	}

	    
	let leaves = []
	if (typeof req.body.leaves === 'string') {
		leaves.push(req.body.leaves)
	} else {
		leaves = req.body.leaves
	}

	// if (typeof req.body.videos === 'string') {
	// 	images.push(req.body.videos)
	// } else {
	// 	videos = req.body.videos
	// }

	let imagesLinks = [];

	for (let i = 0; i < images.length; i++) {
		let imageDataUri = images[i]
		// console.log(imageDataUri)
		try {
			const result = await cloudinary.v2.uploader.upload(`${imageDataUri}`, {
				folder: 'Documentations',
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

	let videoLinks = [];

	for (let i = 0; i < videos.length; i++) {
		let videoLink = videos[i];
		try {
			const result = await cloudinary.v2.uploader.upload(`${videoLink}`, {
				folder: 'Documentations',
				width: 150,
				crop: "scale",
			});
	
			videoLinks.push({
				public_id: result.public_id,
				url: result.secure_url,
			});
	
		} catch (error) {
			console.log(error);
		}
	}
	
	// let leavesLinks = [];
	
	// for (let i = 0; i < leaves.length; i++) {
	// 	let leaf = leaves[i];
	// 	try {
	// 		leavesLinks.push({
	// 			length: leaf.length,
	// 			width: leaf.width
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }
	
	// Also, make sure that the variable names inside the try blocks match the correct names.
	
	req.body.images = imagesLinks;
	req.body.video = videoLinks;
	//   
	const documentation = await Documentation.create(req.body);
	if (!documentation)
		return res.status(400).json({
			success: false,
			message: 'Documentation not created'
		})
	res.status(201).json({
		success: true,
		documentation
	})
}

exports.updateDocumentation = async (req, res, next) => {
	let Documentation = await Documentation.findById(req.params.id);
	// console.log(req.body)
	if (!Documentation) {
		return res.status(404).json({
			success: false,
			message: 'Documentation not found'
		})
	}
	let images = []

	if (typeof req.body.images === 'string') {
		images.push(req.body.images)
	} else {
		images = req.body.images
	}
	if (images !== undefined) {
		// Deleting images associated with the Documentation
		for (let i = 0; i < Documentation.images.length; i++) {
			try {
				let imageDataUri = Documentation.images[i]
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
			folder: 'Documentations',
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
	Documentation = await Documentation.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindandModify: false
	})
	if (!Documentation)
		return res.status(400).json({
			success: false,
			message: 'Documentation not updated'
		})
	// console.log(Documentation)
	return res.status(200).json({
		success: true,
		Documentation
	})
}

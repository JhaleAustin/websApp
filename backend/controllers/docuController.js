 
const Documentation = require('../models/docu/docuCollection')
const Plant = require('../models/docu/planttypesCollection')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')
 
exports.newPlantTypes = async (req, res, next) => {

	const plantTypes = await Plant.create(req.body);
	if (!plantTypes)
		return res.status(400).json({
			success: false,
			message: 'FAILED TO CREATE PLANT TYOES'
		})
	res.status(201).json({
		success: true,
		plantTypes
	})
}

exports.newDocumentation = async (req, res, next) => {

	try {
	const plantTypes = await Plant.findById(req.params.id);

	console.log(plantTypes)


	let images = [];
	// let images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    
	if (typeof req.body.images === 'string') {
		images.push(req.body.images)
	} else {
		images = req.body.images
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
	req.body.images = imagesLinks;

	let leaves;
	if (typeof req.body.leaves === 'string') {
		leaves = JSON.parse(req.body.leaves);
	} else {
		leaves = req.body.leaves;
	}
	
	const documentation = await Documentation.create({
		plantTypes: req.params.id,
		collectionDate: req.body.collectionDate,
		height: req.body.height,
		leaves: {
			length: leaves.length,
			width: leaves.width,
		},
		numOfLeaves: req.body.numOfLeaves,
		images: imagesLinks
	});

	if (!documentation)
		return res.status(400).json({
			success: false,
			message: 'FAILED TO ADD DATA'
		})
	res.status(201).json({
		success: true,
		documentation
	})

} catch (error) {
	res.status(400).json({
		success: false,
		message: 'FAILED TO ADD DATA',
		error: error.message
	});
}
}

exports.getWithMulching = async (req, res, next) => {
    try {
		const plantType = await Plant.findOne({ types: "With Mulch" });

        if (!plantType) {
            return res.status(404).json({
                success: false,
                message: 'PlantType "With Mulch" not found',
            });
        }

        const withMulch = await Documentation.find({ plantTypes: plantType._id });
			res.status(200).json({
            success: true,
			plantTypes: plantType._id,
            withMulch,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'ERROR FETCHING WITH MULCHING DATA COLLECTION',
            error: error.message
        });
    }
}

exports.getWithoutMulching = async (req, res, next) => {
    try {
		const plantType = await Plant.findOne({ types: "Without Mulch" });

        if (!plantType) {
            return res.status(404).json({
                success: false,
                message: 'PlantType "Without Mulch" not found',
            });
        }

		console.log(plantType._id)
       
        const withoutMulch = await Documentation.find({ plantTypes: plantType._id });
		
			res.status(200).json({
            success: true,
			plantTypes: plantType._id,
            withoutMulch,

			
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'ERROR FETCHING WITH MULCHING DATA COLLECTION',
            error: error.message
        });
    }
}


exports.getDocumentations2 = async (req, res, next) => {
	// const Documentations = await Documentation.find({});
	// const resPerPage = 4;
	// const DocumentationsCount = await Documentation.countDocuments();
	// const apiFeatures = new APIFeatures(Documentation.find(), req.query).search().filter()
	// apiFeatures.pagination(resPerPage);
	// const Documentations = await apiFeatures.query;
	// const filteredDocumentationsCount = Documentations.length
	// if (!Documentations) {
	// 	return res.status(404).json({
	// 		success: false,
	// 		message: 'No Documentations'
	// 	})
	// }
	// res.status(200).json({
	// 	success: true,
	// 	count: Documentations.length,
	// 	DocumentationsCount,
	// 	Documentations,
	// 	resPerPage,
	// 	filteredDocumentationsCount,
	// })




	const plantType1 = await Plant.findOne({ types: "With Mulch" });

        if (!plantType1) {
            return res.status(404).json({
                success: false,
                message: 'PlantType "With Mulch" not found',
            });
        }

        const withMulch = await Documentation.find({ plantTypes: plantType1._id });
  
	const plantType2 = await Plant.findOne({ types: "Without Mulch" });

        if (!plantType2) {
            return res.status(404).json({
                success: false,
                message: 'PlantType "Without Mulch" not found',
            });
        }
       
        const withoutMulch = await Documentation.find({ plantTypes: plantType2._id });
		


			res.status(200).json({
            success: true,
			plantTypes1: plantType1._id,
            withoutMulch,
			plantTypes2: plantType2._id,
            withMulch,
 
        });
 

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
	const getDocumentation = await Documentation.findById(req.params.id);
	if (!getDocumentation) {
		return res.status(404).json({
			success: false,
			message: 'DATA NOT FOUND'
		})
	}
	res.status(200).json({
		success: true,
		getDocumentation
	})
}

exports.deleteDocumentation = async (req, res, next) => {
	const documentation = await Documentation.findByIdAndDelete(req.params.id);
	if (!documentation) {
		return res.status(404).json({
			success: false,
			message: 'DATA NOT FOUND'
		})
	}

	if (documentation.images && documentation.images.length > 0) {
		for (const images of documentation.images) {
			if (images.public_id) {
				await cloudinary.v2.uploader.destroy(images.public_id);
			}
		}
	}

	res.status(200).json({
		success: true,
		message: 'DATA NOT DELETED'
	})
}

exports.updateDocumentation = async (req, res, next) => {

	
	const { collectionDate, height, leaves, numOfLeaves, length, width } = req.body;
	try {
	let documentation = await Documentation.findById(req.params.id);
	// console.log(req.body)
	if (!documentation) {
		return res.status(404).json({
			success: false,
			message: 'DATA NOT FOUND'
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
		for (let i = 0; i < documentation.images.length; i++) {
			try {
				let imageDataUri = documentation.images[i]
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

	let leaves;
	if (typeof req.body.leaves === 'string') {
		leaves = JSON.parse(req.body.leaves);
	} else {
		leaves = req.body.leaves;
	}

	documentation.collectionDate = collectionDate,
	documentation.height = height,
	// documentation.leaves.length = length,
	// documentation.leaves.width = width,
	documentation.leaves = leaves;
	documentation.numOfLeaves = numOfLeaves;
	documentation.images = imagesLinks

	documentation = await documentation.save();

	if (!documentation)
		return res.status(400).json({
			success: false,
			message: 'FAILED TO UPDATE DATA'
		})
	// console.log(Documentation)
	return res.status(200).json({
		success: true,
		documentation
	})
	} catch (error) {
		// Handle any potential errors here
		console.error('ERROR UPDATING DATA: ', error);
		res.status(500).json({
			success: false,
			message: 'INTERNAL SERVER ERROR'
		});
	}
}

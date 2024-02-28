 
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
	const getProcess = await Process.findById(req.params.id);
	if (!getProcess) {
		return res.status(404).json({
			success: false,
			message: 'Process not found'
		})
	}
	res.status(200).json({
		success: true,
		getProcess
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

// exports.newProcess = async (req, res, next) => {
//     const { title, content } = req.body;
// 	const video = req.file; // Use req.file to get the uploaded video file
  
// 	console.log("video", video);
	

//     try {
//         const result = await cloudinary.uploader.upload_large(`${file.path}`, {
//             folder: 'Process',
//             resource_type: 'Video',
//         });

//         const videoLink = {
//             public_id: result.public_id,
//             url: result.secure_url,
//         };

// 		console.log('Video Link:', result);

//         // Create new process with the single videoLink
//         const newProcess = new Process({
//             title,
//             content,
//             videos: videoLink,
//         });

//         // Save the process to the database
//         const savedProcess = await newProcess.save();

//         // Return success response
//         res.status(201).json({
//             success: true,
//             process: savedProcess,
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'INTERNAL SERVER ERROR',
//         });
//     }
// };


// exports.newProcess = async (req, res, next) => {
//     const { title, content } = req.body;
//     const video = req.file; // Use req.file to get the uploaded video file

//     console.log("video", video);

//     try {
//         const result = await cloudinary.uploader.upload_large(`${video.path}`, {
//             folder: 'Process',
//             resource_type: 'Video',
//         });

//         console.log('Cloudinary Upload Result:', result);

//         // Check the structure of the result and adjust accordingly
//         const videoLink = {
//             public_id: result.public_id || result?.public_id,
//             url: result.secure_url || result?.secure_url,
//         };

//         console.log('Video Link:', videoLink);

//         // Create new process with the single videoLink
//         const newProcess = new Process({
//             title,
//             content,
//             videos: videoLink,
//         });

//         // Save the process to the database
//         const savedProcess = await newProcess.save();

//         // Return success response
//         res.status(201).json({
//             success: true,
//             process: savedProcess,
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'INTERNAL SERVER ERROR',
//         });
//     }
// };


// exports.newProcess = async (req, res, next) => {
//     const { title, content } = req.body;
//     const video = req.file; // Use req.file to get the uploaded video file

//     console.log("video", video);

    // try {
    //     const result = await cloudinary.uploader.upload_large(`${video.path}`, {
    //         folder: 'Process',
    //         resource_type: 'Video',
    //     });

    //     // console.log('Cloudinary Upload Result:', result);

    //     // Check if result is defined and has the required properties
    //     if (result && result.public_id && result.secure_url) {
    //         // Create videoLink object
    //         const videoLink = {
    //             public_id: result.public_id,
    //             url: result.secure_url,
    //         };

    //         console.log('Video Link:', videoLink);

    //         // Create new process with the single videoLink
    //         const newProcess = new Process({
    //             title,
    //             content,
    //             videos: videoLink,
    //         });

    //         // Save the process to the database
    //         const savedProcess = await newProcess.save();

    //         // Return success response
    //         res.status(201).json({
    //             success: true,
    //             process: savedProcess,
    //         });
    //     } else {
    //         // Handle the case when result is not as expected
    //         console.error('Unexpected result structure:', result);
    //         res.status(500).json({
    //             success: false,
    //             message: 'INTERNAL SERVER ERROR',
    //         });
    //     }
    // } catch (error) {
    //     console.error('Error:', error);
    //     res.status(500).json({
    //         success: false,
    //         message: 'INTERNAL SERVER ERROR',
    //     });
    // }
// };


// exports.newProcess = async (req, res, next) => {
//     const { title, content } = req.body;
//     const video = req.file; // Use req.file to get the uploaded video file

//     console.log("video", video);

//     try {
//         const result = await cloudinary.uploader.upload_large(`${video.path}`, {
//             folder: 'Process',
//             resource_type: 'Video',
//         });

//         console.log('Cloudinary Upload Result:', result);

//         // Check if result is defined and has the required properties
//         if (result && result.public_id) {
//             // For videos, use the public_id to construct the URL
//             const videoLink = {
//                 public_id: result.public_id,
//                 url: `https://res.cloudinary.com/dntyqq8we/video/upload/${result.public_id}`,
//             };

//             console.log('Video Link:', videoLink);

//             // Create new process with the single videoLink
//             const newProcess = new Process({
//                 title,
//                 content,
//                 videos: videoLink,
//             });

//             // Save the process to the database
//             const savedProcess = await newProcess.save();

//             // Return success response
//             res.status(201).json({
//                 success: true,
//                 process: savedProcess,
//             });
//         } else {
//             // Handle the case when result is not as expected
//             console.error('Unexpected result structure:', result);
//             res.status(500).json({
//                 success: false,
//                 message: 'INTERNAL SERVER ERROR - Unexpected result structure from Cloudinary upload.',
//             });
//         }
//     } catch (error) {
//         console.error('Error during Cloudinary upload:', error);
//         res.status(500).json({
//             success: false,
//             message: 'INTERNAL SERVER ERROR - Error during Cloudinary upload.',
//         });
//     }
// };



// exports.newProcess = async (req, res, next) => {
//     const { title, content } = req.body;
//     const file = req.file; // Use req.file to get the uploaded file (image or video)

//     console.log("file", file);

//     try {
//         const result = await cloudinary.uploader.upload_large(`${file.path}`, {
//             folder: 'Process',
//             resource_type: file.mimetype.startsWith('video') ? 'Video' : 'Image',
//         });

//         console.log('Cloudinary Upload Result:', result);

//         // Check if result is defined and has the required properties
//         if (result && result.public_id) {
//             // Construct the URL based on resource type
//             const resourceType = file.mimetype.startsWith('video') ? 'video' : 'image';
//             const mediaLink = {
//                 public_id: result.public_id,
//                 url: `https://res.cloudinary.com/dntyqq8we/${resourceType}/upload/${result.public_id}`,
//             };

//             console.log('Media Link:', mediaLink);

//             // Create new process with the single mediaLink
//             const newProcess = new Process({
//                 title,
//                 content,
//                 media: mediaLink, // Assuming you have a field named 'media' in your Process model
//             });

//             // Save the process to the database
//             const savedProcess = await newProcess.save();

//             // Return success response
//             res.status(201).json({
//                 success: true,
//                 process: savedProcess,
//             });
//         } else {
//             // Handle the case when result is not as expected
//             console.error('Unexpected result structure:', result);
//             res.status(500).json({
//                 success: false,
//                 message: 'INTERNAL SERVER ERROR - Unexpected result structure from Cloudinary upload.',
//             });
//         }
//     } catch (error) {
//         console.error('Error during Cloudinary upload:', error);
//         res.status(500).json({
//             success: false,
//             message: 'INTERNAL SERVER ERROR - Error during Cloudinary upload.',
//         });
//     }
// };



// const streamifier = require('streamifier'); // Install using: npm install streamifier

// exports.newProcess = async (req, res, next) => {
//     const { title, content } = req.body;
//     const video = req.file; // Use req.file to get the uploaded video file

//     console.log("video", video);

//     try {
//         const uploadStream = cloudinary.uploader.upload_stream({
//             folder: 'Process',
//             resource_type: 'Video',
//         }, (error, result) => {
//             if (error || !result.public_id) {
//                 console.error('Cloudinary Upload Error:', error);
//                 return res.status(500).json({
//                     success: false,
//                     message: 'INTERNAL SERVER ERROR - Error during Cloudinary upload.',
//                 });
//             }

//             const videoLink = {
//                 public_id: result.public_id,
//                 url: `https://res.cloudinary.com/dntyqq8we/video/upload/${result.public_id}`,
//             };

//             console.log('Video Link:', videoLink);

//             const newProcess = new Process({
//                 title,
//                 content,
//                 videos: videoLink,
//             });

//             newProcess.save()
//                 .then(savedProcess => {
//                     res.status(201).json({
//                         success: true,
//                         process: savedProcess,
//                     });
//                 })
//                 .catch(error => {
//                     console.error('Error saving process:', error);
//                     res.status(500).json({
//                         success: false,
//                         message: 'INTERNAL SERVER ERROR - Error saving process.',
//                     });
//                 });
//         });

//         // Use streamifier to create a readable stream from the video file buffer
//         const videoStream = streamifier.createReadStream(video.buffer);

//         // Pipe the video stream to Cloudinary upload stream
//         videoStream.pipe(uploadStream);
//     } catch (error) {
//         console.error('Error during Cloudinary upload:', error);
//         res.status(500).json({
//             success: false,
//             message: 'INTERNAL SERVER ERROR - Error during Cloudinary upload.',
//         });
//     }
// };



// const streamifier = require('streamifier');

// exports.newProcess = async (req, res, next) => {
//     const { title, content } = req.body;
//     const video = req.file; // Use req.file to get the uploaded video file

//     console.log("video", video);

//     try {
//         if (!video || !video.buffer) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid video file provided.',
//             });
//         }

//         const uploadStream = cloudinary.uploader.upload_stream({
//             folder: 'Process',
//             resource_type: 'Video',
//         }, (error, result) => {
//             if (error || !result.public_id) {
//                 console.error('Cloudinary Upload Error:', error);
//                 return res.status(500).json({
//                     success: false,
//                     message: 'INTERNAL SERVER ERROR - Error during Cloudinary upload.',
//                 });
//             }

//             const videoLink = {
//                 public_id: result.public_id,
//                 url: `https://res.cloudinary.com/dntyqq8we/video/upload/${result.public_id}`,
//             };

//             console.log('Video Link:', videoLink);

//             const newProcess = new Process({
//                 title,
//                 content,
//                 videos: videoLink,
//             });

//             newProcess.save()
//                 .then(savedProcess => {
//                     res.status(201).json({
//                         success: true,
//                         process: savedProcess,
//                     });
//                 })
//                 .catch(error => {
//                     console.error('Error saving process:', error);
//                     res.status(500).json({
//                         success: false,
//                         message: 'INTERNAL SERVER ERROR - Error saving process.',
//                     });
//                 });
//         });

//         // Use streamifier to create a readable stream from the video file buffer
//         const videoStream = streamifier.createReadStream(video.buffer);

//         // Pipe the video stream to Cloudinary upload stream
//         videoStream.pipe(uploadStream);
//     } catch (error) {
//         console.error('Error during Cloudinary upload:', error);
//         res.status(500).json({
//             success: false,
//             message: 'INTERNAL SERVER ERROR - Error during Cloudinary upload.',
//         });
//     }
// };





const streamifier = require('streamifier');

exports.newProcess = async (req, res, next) => {
     const { title, content } = req.body;
    // const video = req.file;

	
    // console.log("video", title);

    // console.log("video", content);

    // console.log("video", video);


	const process = await Process.create(req.body);
	if (!process)
		return res.status(400).json({
			success: false,
			message: 'Process not created'
		})
	res.status(201).json({
		success: true,
		process
	})



    // try {
        // Check if req.file and req.file.buffer are available
        // if (!video || !video.buffer) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Video file is missing or invalid',
        //     });
        // }

        // const uploadStream = cloudinary.uploader.upload_stream({
        //     folder: 'Process',
        //     resource_type: 'Video',
        // }, (error, result) => {
        //     if (error || !result.public_id) {
        //         console.error('Cloudinary Upload Error:', error);
        //         return res.status(500).json({
        //             success: false,
        //             message: 'INTERNAL SERVER ERROR - Error during Cloudinary upload.',
        //         });
        //     }

			
		// 	console.log("video", result);


        //     const videoLink = {
        //         public_id: result.public_id,
        //         url: `https://res.cloudinary.com/dntyqq8we/video/upload/${result.public_id}`,
        //     };



        //     console.log('Video Link:', videoLink);

        //     const newProcess = new Process({
        //         title,
        //         content,
        //         videos: videoLink,
        //     });

			
		// 	console.log("video", newProcess);


            // newProcess.save()
            //     .then(savedProcess => {
            //         res.status(201).json({
            //             success: true,
            //             process: savedProcess,
            //         });
            //     })
            //     .catch(error => {
            //         console.error('Error saving process:', error);
            //         res.status(500).json({
            //             success: false,
            //             message: 'INTERNAL SERVER ERROR - Error saving process.',
            //         });
            //     });
        // });

        // Use streamifier to create a readable stream from the video file buffer
        // const videoStream = streamifier.createReadStream(video.buffer);

        // // Pipe the video stream to Cloudinary upload stream
        // videoStream.pipe(uploadStream);
    // } catch (error) {
    //     console.error('Error during Cloudinary upload:', error);
    //     res.status(500).json({
    //         success: false,
    //         message: 'INTERNAL SERVER ERROR - Error during Cloudinary upload.',
    //     });
    // }
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

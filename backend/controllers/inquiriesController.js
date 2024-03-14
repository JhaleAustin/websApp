const { now } = require('mongoose');
const Inquiry = require('../models/forum/inquiriesCollection');
const Answer = require('../models/forum/answersCollection');
const FollowUp = require('../models/forum/followupCollection');
const Reply = require('../models/forum/replyCollection');
const cloudinary = require('cloudinary');

exports.newInquiry = async (req, res, next) => {
  try {
    let imagesLinks = [];

    if (req.body.images) {
      let images = [];

      if (typeof req.body.images === 'string') {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      for (let i = 0; i < images.length; i++) {
        try {
          let imageDataUri = images[i];
          const result = await cloudinary.v2.uploader.upload(`${imageDataUri}`, {
            folder: 'Inquiries',
            width: 150,
            crop: 'scale',
          });

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        } catch (error) {
          console.log(error);
        }
      }
    }

    req.body.images = imagesLinks;

    const inquiries = await Inquiry.create({
      inquiry: req.body.inquiry,
      inputDate: now(),
      images: imagesLinks,
    });

    if (!inquiries)
      return res.status(400).json({
        success: false,
        message: 'UNSUCCESSFUL ASKING INQUIRY ',
      });

    res.status(201).json({
      success: true,
      inquiries,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'FAILED TO INQUIRE',
      error: error.message,
    });
  }
};

exports.getAllInquiries = async (req, res, next) => {
    try {
        const inquiries = await Inquiry.find();

        res.status(200).json({
            success: true,
            inquiries
        });
    } catch (error) {
        res.status(500).json({
   
			success: false,
            message: 'ERROR FETCHING INQUIRIES',
            error: error.message
        });
    }
};

// exports.deleteInquiry = async (req, res, next) => {
// 	const inquries = await Inquiry.findByIdAndDelete(req.params.id);
// 	if (!inquries) {
// 		return res.status(404).json({
// 			success: false,
// 			message: 'ANSWER NOT FOUND'
// 		})
// 	}

//   if (inquries.images && inquries.images.length > 0) {
// 		for (const images of inquries.images) {
// 			if (images.public_id) {
// 				await cloudinary.v2.uploader.destroy(images.public_id);
// 			}
// 		}
// 	}

// 	res.status(200).json({
// 		success: true,
// 		message: 'INQUIRY NOT DELETED'
// 	})
// }

// exports.deleteInquiry = async (req, res, next) => {
//   try {
//     const inquiryId = req.params.id;

//     const answer = await Answer.findOne({ inquiry: inquiryId });

//     if (!answer) {
//       const inquiry = await Inquiry.findByIdAndDelete(inquiryId);

//       if (inquiry && inquiry.images && inquiry.images.length > 0) {
//         for (const image of inquiry.images) {
//           if (image.public_id) {
//             await cloudinary.v2.uploader.destroy(image.public_id);
//           }
//         }
//       }

//       return res.status(200).json({
//         success: true,
//         message: 'INQUIRY DELETED'
//       });
//     }

//     await Answer.findOneAndDelete({ inquiry: inquiryId });

//     if (answer.images && answer.images.length > 0) {
//       for (const image of answer.images) {
//         if (image.public_id) {
//           await cloudinary.v2.uploader.destroy(image.public_id);
//         }
//       }
//     }

//     const inquiry = await Inquiry.findByIdAndDelete(inquiryId);
//     if (inquiry && inquiry.images && inquiry.images.length > 0) {
//       for (const image of inquiry.images) {
//         if (image.public_id) {
//           await cloudinary.v2.uploader.destroy(image.public_id);
//         }
//       }
//     }

//     res.status(200).json({
//       success: true,
//       message: 'INQUIRY DELETED'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.deleteInquiry = async (req, res, next) => {
//   try {
//     const inquiryId = req.params.id;

//     // Find and delete Answer
//     const answer = await Answer.findOne({ inquiry: inquiryId });
//     if (answer) {
//       // Delete images associated with the answer
//       if (answer.images && answer.images.length > 0) {
//         for (const image of answer.images) {
//           if (image.public_id) {
//             await cloudinary.v2.uploader.destroy(image.public_id);
//           }
//         }
//       }
//       await Answer.findByIdAndDelete(answer._id);
//     }

//     // Find and delete FollowUp
//     const followup = await FollowUp.findOne({ answer: answer._id });
//     if (followup) {
//       // Additional cleanup if needed for followup images or other related data
//       await FollowUp.findByIdAndDelete(followup._id);
//     }

//     // Find and delete Reply
//     const reply = await Reply.findOne({ followup: followup._id });
//     if (reply) {
//       // Additional cleanup if needed for reply images or other related data
//       await Reply.findByIdAndDelete(reply._id);
//     }

//     // Delete images associated with the inquiry
//     const inquiry = await Inquiry.findById(inquiryId);
//     if (inquiry && inquiry.images && inquiry.images.length > 0) {
//       for (const image of inquiry.images) {
//         if (image.public_id) {
//           await cloudinary.v2.uploader.destroy(image.public_id);
//         }
//       }
//     }

//     // Finally, delete the Inquiry
//     await Inquiry.findByIdAndDelete(inquiryId);

//     res.status(200).json({
//       success: true,
//       message: 'INQUIRY DELETED'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

exports.deleteInquiry = async (req, res, next) => {
  try {
    const inquiryId = req.params.id;

    // Delete Answer and related data
    await Answer.deleteMany({ inquiry: inquiryId }).then(async () => {
      // Delete images associated with the answer
      const answerImages = await cloudinary.v2.api.delete_resources_by_prefix(
        `answer_${inquiryId}`
      );

      // Delete FollowUps and related data
      await FollowUp.deleteMany({}).then(async () => {
        // Delete images associated with the followups
        const followupImages = await cloudinary.v2.api.delete_resources_by_prefix(
          `followup_${inquiryId}`
        );

        // Delete Replies and related data
        await Reply.deleteMany({}).then(async () => {
          // Delete images associated with the replies
          const replyImages = await cloudinary.v2.api.delete_resources_by_prefix(
            `reply_${inquiryId}`
          );

          // Delete images associated with the inquiry
          const inquiryImages = await cloudinary.v2.api.delete_resources_by_prefix(
            `inquiry_${inquiryId}`
          );

          // Delete the Inquiry
          await Inquiry.findByIdAndDelete(inquiryId);

          res.status(200).json({
            success: true,
            message: 'INQUIRY DELETED',
            answerImages,
            followupImages,
            replyImages,
            inquiryImages
          });
        });
      });
    });
  } catch (error) {
    next(error);
  }
};



const { now } = require('mongoose');
const Answer = require('../models/forum/answersCollection');
const Inquiry = require('../models/forum/inquiriesCollection');
const FollowUp = require('../models/forum/followupCollection');
const Reply = require('../models/forum/replyCollection');
const User = require('../models/authCollection');

const cloudinary = require('cloudinary');

exports.newAnswer = async (req, res, next) => {
  try {

    const inquiries = await Inquiry.findById(req.params.id);

        if (!inquiries) {
            return res.status(404).json({ success: false, error: 'INQUIRY NOT FOUND' });
		}

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
            folder: 'Answers',
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

    const answers = await Answer.create({
      inquiry: req.params.id,
      admin: req.user._id,
      answer: req.body.answer,
      answerDate: now(),
      images: imagesLinks,
    });

    console.log(answers)

    if (!answers)
      return res.status(400).json({
        success: false,
        message: 'REPLY UNSUCCESSFULLY POSTED ',
      });

    res.status(201).json({
      success: true,
      answers,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: 'FAILED TO ANSWER',
      error: error.message,
    });
  }
};

exports.getAllAnswers= async (req, res, next) => {
    try {
        const answers = await Answer.find();

        res.status(200).json({
            success: true,
            answers
        });
    } catch (error) {
        res.status(500).json({
   
			success: false,
            message: 'ERROR FETCHING ANSWERS',
            error: error.message
        });
    }
};

// exports.deleteAnswer = async (req, res, next) => {
// 	const answers = await Answer.findByIdAndDelete(req.params.id);
// 	if (!answers) {
// 		return res.status(404).json({
// 			success: false,
// 			message: 'ANSWER NOT FOUND'
// 		})
// 	}

//   if (answers.images && answers.images.length > 0) {
// 		for (const images of answers.images) {
// 			if (images.public_id) {
// 				await cloudinary.v2.uploader.destroy(images.public_id);
// 			}
// 		}
// 	}

// 	res.status(200).json({
// 		success: true,
// 		message: 'ANSWER NOT DELETED'
// 	})
// }

exports.deleteAnswer = async (req, res, next) => {
  try {
    const answerId = req.params.id;

    await FollowUp.deleteMany({ answer: answerId }).then(async () => {
      // Delete images associated with the answer
      const followupImages = await cloudinary.v2.api.delete_resources_by_prefix(
        `followup_${answerId}`
      );

        // Delete Replies and related data
        await Reply.deleteMany({}).then(async () => {
          // Delete images associated with the replies
          const replyImages = await cloudinary.v2.api.delete_resources_by_prefix(
            `reply_${answerId}`
          );

          // Delete images associated with the inquiry
          const answerImages = await cloudinary.v2.api.delete_resources_by_prefix(
            `answer_${answerId}`
          );

          // Delete the Inquiry
          await Answer.findByIdAndDelete(answerId);

          res.status(200).json({
            success: true,
            message: 'ANSWER DELETED',
            followupImages,
            replyImages,
            answerImages
          });
        });
      });
  } catch (error) {
    next(error);
  }
};

// exports.getAdminForum= async (req, res, next) => {
//   try {
//       const inquries = await Inquiry.findById(req.params.id)
//       const answers = await Answer.find()
//       .populate ('inquiry')
//       .populate('admin');

//       res.status(200).json({
//           success: true,
//           answers
//       });
//   } catch (error) {
//       res.status(500).json({
 
//     success: false,
//           message: 'ERROR FETCHING ANSWERS',
//           error: error.message
//       });
//   }
// };

exports.getAdminForum = async (req, res, next) => {
  try {

    const answers = await Answer.find({inquiry: req.params.id}).populate('admin').populate('inquiry')
    // const answersArray = answers ? answers : [];

    res.status(200).json({
      success: true,
      answers,
      // answers: answersArray,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Error fetching data',
      error: error.message,
    });
  }
};




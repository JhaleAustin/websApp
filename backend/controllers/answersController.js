const { now } = require('mongoose');
const Answer = require('../models/answersCollection');
const Inquiry = require('../models/inquiriesCollection');
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

exports.deleteAnswer = async (req, res, next) => {
	const answers = await Answer.findByIdAndDelete(req.params.id);
	if (!answers) {
		return res.status(404).json({
			success: false,
			message: 'ANSWER NOT FOUND'
		})
	}

	res.status(200).json({
		success: true,
		message: 'ANSWER NOT DELETED'
	})
}

const { now } = require('mongoose');
const Answer = require('../models/forum/answersCollection');
const Inquiry = require('../models/forum/inquiriesCollection');
const FollowUp = require('../models/forum/followupCollection');
const Reply = require('../models/forum/replyCollection');
const User = require('../models/authCollection');
const cloudinary = require('cloudinary');

exports.newFollowUp = async (req, res, next) => {
    try {
          const answers = await Answer.findById(req.params.id);

          if (!answers) {
            return res.status(404).json({ success: false, error: 'ANSWER UP NOT FOUND' });
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
                  folder: 'FollowUp',
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
      
          const followup = await FollowUp.create({
            answer: req.params.id,
            followup: req.body.followup,
            followupDate: now(),
            images: imagesLinks,
          });
      
          if (!followup) {
            return res.status(400).json({
              success: false,
              message: 'REPLY UNSUCCESSFULLY POSTED ',
            });
          }

    res.status(201).json({
      success: true,
      followup
    });
    } catch (error) {
      console.log(error);
  
      res.status(400).json({
        success: false,
        message: 'FAILED TO FOLLOW UP',
        error: error.message,
      });
    }
};

exports.newReply = async (req, res, next) => {
  try {
      const followup = await FollowUp.findById(req.params.id);

      console.log(followup);
      if (!followup) {
          return res.status(404).json({ success: false, error: 'FOLLOW UP NOT FOUND' });
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
                      folder: 'Reply',
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

      // Check if Communication with the follow-up ID already exists

      const reply = await Reply.create({
        followup: req.params.id,
        admin: req.user._id,
        reply: req.body.reply,
        replyDate: now(),
        images: imagesLinks,
      });

      return res.status(201).json
      ({
          success: true,
          reply
      });
      

  } catch (error) {
      console.error(error);

      res.status(400).json({
          success: false,
          message: 'FAILED TO REPLY',
          error: error.message,
      });
  }
};

exports.getAllFollowUp= async (req, res, next) => {
  try {
      const followups = await FollowUp.find();

      res.status(200).json({
          success: true,
          followups
      });
  } catch (error) {
      res.status(500).json({
 
    success: false,
          message: 'ERROR FETCHING FOLLOW UPS',
          error: error.message
      });
  }
};

exports.getAllReply= async (req, res, next) => {
  try {
      const replies = await Reply.find();

      res.status(200).json({
          success: true,
          replies
      });
  } catch (error) {
      res.status(500).json({
 
    success: false,
          message: 'ERROR FETCHING REPLIES',
          error: error.message
      });
  }
};

exports.deleteFollowUp = async (req, res, next) => {
  try {
    const followupId = req.params.id;

    await Reply.deleteMany({ followup: followupId }).then(async () => {
      const replyImages = await cloudinary.v2.api.delete_resources_by_prefix(
        `reply_${followupId}`
      );

          // Delete images associated with the inquiry
          const followupImages = await cloudinary.v2.api.delete_resources_by_prefix(
            `followup_${followupId}`
          );

          // Delete the Inquiry
          await FollowUp.findByIdAndDelete(followupId);

          res.status(200).json({
            success: true,
            message: 'ANSWER DELETED',
            followupImages,
            replyImages,
          });
      });
    
  } catch (error) {
    next(error);
  }
};

exports.deleteReply = async (req, res, next) => {
  try {
    
    const replies = await Reply.findByIdAndDelete(req.params.id);

    if (replies.images && replies.images.length > 0) {
      for (const image of replies.images) {
        if (image.public_id) {
          await cloudinary.v2.uploader.destroy(image.public_id);
        }
      }
    }
    
    res.status(200).json({
      success: true,
      message: 'REPLY DELETED'
    });
  } catch (error) {
    next(error);
  }
};

exports.getAdminForum = async (req, res, next) => {
  try {

    const answers = await Answer.find({inquiry: req.params.id}).populate('admin').populate('inquiry')
    const answersArray = answers ? answers : [];

    res.status(200).json({
      success: true,
      // answers,
      answers: answersArray,
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


exports.getAdminFollowUp = async (req, res, next) => {
  try {

    const followups = await FollowUp.find({answer: req.params.id}).populate('answer')

    res.status(200).json({
      success: true,
      followups,
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

exports.getAdminReply = async (req, res, next) => {
  try {

      const replies = await Reply.find({followup: req.params.id}).populate('admin').populate('followup')

    res.status(200).json({
      success: true,
      replies,
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

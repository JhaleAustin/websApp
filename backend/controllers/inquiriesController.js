const { now } = require('mongoose');
const Inquiry = require('../models/inquiriesCollection');
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

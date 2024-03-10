const { now } = require('mongoose');
const Analysis = require('../models/analysisCollection');

exports.newAnalysis = async (req, res, next) => {
    try {
      const analyze = await Analysis.create({
        height: req.body.height,
        numOfLeaves: req.body.numOfLeaves,
        analysisDate: now(),
      });
  
  
      if (!analyze)
        return res.status(400).json({
          success: false,
          message: 'ANALYSIS UNSUCCESSFULLY CREATED ',
        });
  
      res.status(201).json({
        success: true,
        analyze,
      });
    } catch (error) {
      console.log(error);
  
      res.status(400).json({
        success: false,
        message: 'FAILED TO ANALYZE',
        error: error.message,
      });
    }
  };
const homeCollection = require('../models/homeCollection')
const peanutshellCollection = require('../models/types/peanutshellCollection')
const mulchingCollection =  require('../models/types/mulchingCollection')
const peanutshellmulchingCollection = require('../models/types/peanutshellmulchingCollection')
const benefitsCollection = require('../models/types/benefitsCollection')
// const Order = require('../models/order')
// const APIFeatures = require('../utils/apiFeatures')


exports.newType = async (req, res, next) => {

	const homeTopic = await homeCollection.create(req.body);
	if (!homeTopic)
		return res.status(400).json({
			success: false,
			message: 'FAILED TO CREATE TOPIC'
		})
	res.status(201).json({
		success: true,
		homeTopic
	})
}

exports.newTopic = async (req, res, next) => {

	try {
        const typeTopic = await homeCollection.findById(req.params.id);

        if (!typeTopic) {
            return res.status(404).json({ success: false, error: 'TYPE NOT FOUND' });
		}

		if (typeTopic.types == "PS")
		{
			const peanutshell = await peanutshellCollection.create({
                types: req.params.id,
                topic: req.body.topic,
				description: req.body.description,
            });

			return res.status(201).json({
                success: true,
                peanutshell
            });
		}

		else if (typeTopic.types == "M")
		{
			const mulching = await mulchingCollection.create({
                types: req.params.id,
                topic: req.body.topic,
				description: req.body.description,
            });

			return res.status(201).json({
                success: true,
                mulching
            });
		}

		else if (typeTopic.types == "PSM")
		{
			const peanutshellmulching = await peanutshellmulchingCollection.create({
                types: req.params.id,
				topic: req.body.topic,
				description: req.body.description,
            });

			return res.status(201).json({
                success: true,
                peanutshellmulching
            });
		}

		else if (typeTopic.types == "B")
		{
			const benefits = await benefitsCollection.create({
                types: req.params.id,
				topic: req.body.topic,
				description: req.body.description,
            });

			return res.status(201).json({
                success: true,
                benefits
            });
		}

		else
		{
			return res.status(404).json({ success: false, error: 'TOPIC NOT FOUND' });
		}

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'FAILED TO CREATE TOPIC',
            error: error.message
        });
    }

}

exports.updatePeanutShell = async (req, res, next) => {
    const { topic, description } = req.body;

    try {
        let peanutshell = await peanutshellCollection.findById(req.params.id);

        if (!peanutshell) {
            return res.status(404).json({ success: false, error: 'TOPIC NOT FOUND' });
        }

        peanutshell.topic = topic;
        peanutshell.description = description;

        peanutshell = await peanutshell.save();

        if (!peanutshell) {
            return res.status(400).json({
                success: false,
                message: 'FAILED TO UPDATE PEANUT SHELL INFORMATION'
            });
        }

        res.status(201).json({
            success: true,
            peanutshell
        });
    } catch (error) {
        // Handle any potential errors here
        console.error('ERROR UPDATING PEANUT SHELL INFORMATION: ', error);
        res.status(500).json({
            success: false,
            message: 'INTERNAL SERVER ERROR'
        });
    }
};

exports.updateMulching = async (req, res, next) => {
    const { topic, description } = req.body;

    try {
        let mulching = await mulchingCollection.findById(req.params.id);

        if (!mulching) {
            return res.status(404).json({ success: false, error: 'TOPIC NOT FOUND' });
        }

        mulching.topic = topic;
        mulching.description = description;

        mulching = await mulching.save();

        if (!mulching) {
            return res.status(400).json({
                success: false,
                message: 'FAILED TO UPDATE MULCHING INFORMATION'
            });
        }

        res.status(201).json({
            success: true,
            mulching
        });
    } catch (error) {
        // Handle any potential errors here
        console.error('ERROR UPDATING MULCHING INFORMATION: ', error);
        res.status(500).json({
            success: false,
            message: 'INTERNAL SERVER ERROR'
        });
    }
};

exports.updateBenefits = async (req, res, next) => {
    const { topic, description } = req.body;

    try {
        let benefit = await benefitsCollection.findById(req.params.id);

        if (!benefit) {
            return res.status(404).json({ success: false, error: 'TOPIC NOT FOUND' });
        }

        benefit.topic = topic;
        benefit.description = description;

        benefit = await benefit.save();

        if (!benefit) {
            return res.status(400).json({
                success: false,
                message: 'FAILED TO UPDATE PEANUT SHELL MULCHING INFORMATION'
            });
        }

        res.status(201).json({
            success: true,
            peanutshellmulching
        });
    } catch (error) {
        // Handle any potential errors here
        console.error('ERROR UPDATING PEANUT SHELL MULCHING INFORMATION: ', error);
        res.status(500).json({
            success: false,
            message: 'INTERNAL SERVER ERROR'
        });
    }   
};

exports.updatePeanutShellMulching = async (req, res, next) => {
    const { topic, description } = req.body;

    try {
        let peanutshellmulching = await peanutshellmulchingCollection.findById(req.params.id);

        if (!peanutshellmulching) {
            return res.status(404).json({ success: false, error: 'TYPE NOT FOUND' });
        }

        peanutshellmulching.topic = topic;
        peanutshellmulching.description = description;

        peanutshellmulching = await peanutshellmulching.save();

        if (!peanutshellmulching) {
            return res.status(400).json({
                success: false,
                message: 'FAILED TO UPDATE PEANUT SHELL MULCHING INFORMATION'
            });
        }

        res.status(201).json({
            success: true,
            peanutshellmulching
        });
    } catch (error) {
        // Handle any potential errors here
        console.error('ERROR UPDATING PEANUT SHELL MULCHING INFORMATION: ', error);
        res.status(500).json({
            success: false,
            message: 'INTERNAL SERVER ERROR'
        });
    }
};




// exports.updatePeanutShell = async (req, res, next) => {

//     const { topic, description } = req.body;

// 	let peanutshell = await peanutshellCollection.findById(req.params.id);

//         if (!peanutshell) {
//             return res.status(404).json({ success: false, error: 'TYPE NOT FOUND' });
// 		}

	
// 		peanutshell = await peanutshellCollection.findByIdAndUpdate(peanutshell.id, peanutshell.types, req.body);

//         if (!peanutshell) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'FAILED TO UPDATE PEANUT SHELL INFORMATION'
//             })
//         }
//         res.status(201).json({
//             success: true,
//             peanutshell
//         })
    

// }

exports.getAllHome = async (req, res, next) => {
    try {
        const benefit = await benefitsCollection.find();
        const mulching = await mulchingCollection.find();
        const peanutshell = await peanutshellCollection.find();
        const peanutshellmulching = await peanutshellmulchingCollection.find();

        res.status(200).json({
            success: true,
            benefit,
            mulching,
            peanutshell,
            peanutshellmulching
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching topics',
            error: error.message
        });
    }
};

exports.getSinglePeanutShell = async (req, res, next) => {
	const peanutshell = await peanutshellCollection.findById(req.params.id);
	if (!peanutshell) {
		return res.status(404).json({
			success: false,
			message: 'NO PEANUT SHELLS INFORMATION FOUND'
		})
	}
	res.status(200).json({
		success: true,
		peanutshell
	})
}

exports.getSinglePeanutShellMulching = async (req, res, next) => {
	const peanutshellmulching = await peanutshellmulchingCollection.findById(req.params.id);
	if (!peanutshellmulching) {
		return res.status(404).json({
			success: false,
			message: 'NO PEANUT SHELL MULCHING INFORMATION FOUND'
		})
	}
	res.status(200).json({
		success: true,
		peanutshellmulching
	})
}

exports.getSingleMulching = async (req, res, next) => {
	const mulching = await mulchingCollection.findById(req.params.id);
	if (!mulching) {
		return res.status(404).json({
			success: false,
			message: 'NO MULCHING INFORMATION FOUND'
		})
	}
	res.status(200).json({
		success: true,
		mulching
	})
}

exports.getSingleBenefit = async (req, res, next) => {
	const benefit = await benefitsCollection.findById(req.params.id);
	if (!benefit) {
		return res.status(404).json({
			success: false,
			message: 'NO BENEFIT INFORMATION FOUND'
		})
	}
	res.status(200).json({
		success: true,
		benefit
	})
}

exports.getTopics = async (req, res, next) => {
	const hometypes = await homeCollection.find();
	if (!hometypes) {
		return res.status(404).json({
			success: false,
			message: 'NO TOPIC FOUND'
		})
	}
	res.status(200).json({
		success: true,
		hometypes
	})
}

exports.deletePeanutShell = async (req, res, next) => {

    const peanutshell = await peanutshellCollection.findByIdAndDelete(req.params.id)
    
    if (!peanutshell) {
        return res.status(404).json({ message: `NO PEANUT SHELLS INFORMATION FOUND IN THIS ID` })

    }

    res.status(200).json({
        success: true
    })
}

exports.deleteMulching = async (req, res, next) => {

    const mulching = await mulchingCollection.findByIdAndDelete(req.params.id)
    
    if (!mulching) {
        return res.status(404).json({ message: `NO MULCHING INFORMATION FOUND IN THIS ID` })

    }

    res.status(200).json({
        success: true
    })
}

exports.deletePeanutShellMulching = async (req, res, next) => {

    const peanutshellmulching = await peanutshellmulchingCollection.findByIdAndDelete(req.params.id)
    
    if (!peanutshellmulching) {
        return res.status(404).json({ message: `NO PEANUT SHELL MULCHING INFORMATION FOUND IN THIS ID` })

    }

    res.status(200).json({
        success: true
    })
}

exports.deleteBenefit = async (req, res, next) => {

    const benefits = await benefitsCollection.findByIdAndDelete(req.params.id)

    if (!benefits) {
        return res.status(404).json({ message: `NO BENEFITS INFORMATION FOUND IN THIS ID` })

    }

    res.status(200).json({
        success: true
    })
}


// exports.getMulching = async (req, res, next) => {
// 	const mulching = await mulchingCollection.find();
// 	if (!mulching) {
// 		return res.status(404).json({
// 			success: false,
// 			message: 'NO PEANUT SHELL INFORMATION FOUND'
// 		})
// 	}
// 	res.status(200).json({
// 		success: true,
// 		mulching
// 	})
// }

// exports.getPeanutShellMulching = async (req, res, next) => {
// 	const peanutshellmulching = await peanutshellmulchingCollection.find();
// 	if (!peanutshellmulching) {
// 		return res.status(404).json({
// 			success: false,
// 			message: 'NO PEANUT SHELL MULCHING INFORMATION FOUND'
// 		})
// 	}
// 	res.status(200).json({
// 		success: true,
// 		peanutshellmulching
// 	})
// }

// exports.getBenefits = async (req, res, next) => {
// 	const benefits = await benefitsCollection.find();
// 	if (!benefits) {
// 		return res.status(404).json({
// 			success: false,
// 			message: 'NO BENEFITS INFORMATION FOUND'
// 		})
// 	}
// 	res.status(200).json({
// 		success: true,
// 		benefits
// 	})
// }
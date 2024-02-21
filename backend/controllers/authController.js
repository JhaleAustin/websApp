const User = require('../models/authCollection');
const sendToken = require('../utils/jwtToken');

exports.registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ errors: ['Email already exists.'] });
    }
    
    const user = await User.create(req.body);
    if (!user)
        return res.status(400).json({
            success: false,
            message: 'UNSUCCESSFUL REGISTRATION',
        });
    res.status(201).json({
        success: true,
        user,
    });
};
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password are entered by the user
    if (!email || !password) {
        return res.status(400).json({ error: 'PLEASE PROVIDE YOUR EMAIL AND PASSWORD TO PROCEED.' });
    }

    // Finding user in the database
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'INVALID EMAIL OR PASSWORD.' });
    }

    // Checks if the password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json({ message: 'ENSURE BOTH YOUR EMAIL AND PASSWORD ARE ENTERED CORRECTLY.' });
    }

    // If everything is fine, send the token
    sendToken(user, 200, res);
};

exports.logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'LOGOUT SUCCESSFUL'
    })
}










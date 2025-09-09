const jwt = require('jsonwebtoken');
const { userModel } = require('../../models/user.model');

const validation = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Please authenticate' });
    }
};

module.exports = { validation };

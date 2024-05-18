// backend/middleware/authMiddleware.js


const jwt = require('jsonwebtoken');
const secretKey = 'DevendraKumarSinghGlau'; // Replace with your actual secret key

const authMiddleware = (req, res, next) => {
  // Get token from request headers
  console.log('Middleware executed');
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  console.log("token",token)
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach user data to request object
    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;


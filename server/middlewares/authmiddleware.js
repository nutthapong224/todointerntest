import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Strip "Bearer " prefix and use the token
    const tokenWithoutBearer = token.replace('Bearer ', '');
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = decoded;  // Attach decoded user info to the request object
    next();
  } catch (error) {
    console.error('Token verification error:', error);  // Log the error for debugging
    res.status(401).json({ message: 'Invalid token' });
  }
};

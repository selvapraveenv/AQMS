// backend/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header ('Bearer TOKEN')
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret from your .env file
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user's ID and info from the token to the request object
      // Supabase JWT puts user info in the 'sub' (subject) claim
      req.user = { id: decoded.sub, email: decoded.email }; 
      
      next(); // Proceed to the next step (the controller)
    } catch (error) {
      console.error('Token verification failed', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default protect;
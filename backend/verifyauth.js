import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token;

  // Check if token exists
  if (!token) {
    return res.status(404).json({ success: false, message: "No token, authorization denied" });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user ID and role to the request object
    req.userId = decoded.id;
    req.name = decoded.name;
    req.email = decoded.email;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token is expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

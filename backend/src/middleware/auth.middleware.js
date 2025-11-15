import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized. No token provided." });
    }
    const token = authHeader.split(" ")[1];
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user info to request object
    req.user = {
      id: decoded.id,
      role: decoded.role,    // may be undefined for old tokens
    };
    next(); // proceed to controller
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

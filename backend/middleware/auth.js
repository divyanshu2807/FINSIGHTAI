import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // ✅ Handle both lowercase and uppercase header keys
    const authHeader =
      req.headers["authorization"] || req.headers["Authorization"];

    // ✅ Extract token safely
    const token = authHeader?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });

    // ✅ Verify JWT
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    res.status(400).json({ message: "Invalid token." });
  }
};

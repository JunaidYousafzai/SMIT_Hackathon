const jwt = require("jsonwebtoken");

const verifyAdmin = (request, response, next) => {
  const token = request.cookies.token; 
  if (!token) {
    return response.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 

    console.log(decoded, "--decoded");
    
    if (decoded.role !== "admin") {
      return response.status(403).json({ message: "Access denied. Admins only." });
    } 
    request.user = decoded;
    next();
  } catch (err) {
    return response.status(400).json({ message: "Invalid token." });
  }
};

module.exports = verifyAdmin;

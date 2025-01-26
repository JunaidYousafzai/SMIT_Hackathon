const jwt = require("jsonwebtoken");
const User = require("../models/registerModel");
const expressAsyncHandler = require("express-async-handler");

const authMiddleware = expressAsyncHandler(async (request, response, next) => {
    let token;
    if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
        try {
            token = request.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(decoded);
            
            request.user = await User.findById(decoded.id).select('-password');
            console.log(request.user);
            
            if (!request.user) {
                return response.status(404).json({ message: "User not found!" });
            }
            
            console.log(request.user);
            next();
        } catch (err) {
            console.error(err); 
            return response.status(401).json({ message: "Not authorized, invalid token!" });
        }
    } else {
        return response.status(401).json({ message: "Token maybe invalid or expired" });
    }
});

module.exports = authMiddleware;

import jwt from "jsonwebtoken"
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret"

export const generateJwtToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1h", issuer: "app"});
    return token
}

export const verifyJwtToken = (token) => {
    try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.iss != "app"){
        throw Error("Invalid token");
    }
    return decoded
    } catch (err) {
    if (err.name === "TokenExpiredError") {
        throw Error("Token expired");
    }
    if (err.name === "JsonWebTokenError") {
        throw Error("Invalid token")
    }
    throw Error("Token verification failed")
    }
}
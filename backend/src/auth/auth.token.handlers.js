import jwt from "jsonwebtoken"
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret"

export function generateJwtToken(userId){
    const payload = {
        userId: userId
    }

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1h", issuer: "app"});
    return token
}

export function verifyJwtToken(token){
    try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.iss != "app"){
        return { error: "Invalid Token" }
    }
    return decoded
    } catch (err) {
    if (err.name === "TokenExpiredError") {
        return { error: "Token expired" };
    }
    if (err.name === "JsonWebTokenError") {
        return { error: "Invalid token" }
    }
    }
}
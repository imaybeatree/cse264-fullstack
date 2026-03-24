import { verifyJwtToken } from "./auth.token.handlers.js";
//check jwt token and assign userId to res.locals
export const middleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const split = authHeader.split(" ");

  // Expected: "Bearer <token>"
  if (split.length !== 2 || split[0] !== "Bearer") {
    return res.status(401).json({ error: "Invalid Authorization format" });
  }

  const token = split[1];
  try {
    const data = verifyJwtToken(token);
    res.locals.user = { userId: data.userId };

    next();
  } catch (err) {
    console.log("Auth failed");
    return res.status(401).json({ error: "Invalid token" });
  }
};
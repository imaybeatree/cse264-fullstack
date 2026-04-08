import { verifyJwtToken } from "./auth.token.handlers.js";

// base auth: check jwt token and assign userId to res.locals
const parseToken = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Missing Authorization header" });
    return null;
  }

  const split = authHeader.split(" ");

  if (split.length !== 2 || split[0] !== "Bearer") {
    res.status(401).json({ error: "Invalid Authorization format" });
    return null;
  }

  try {
    const data = verifyJwtToken(split[1]);
    res.locals.user = { userId: data.userId, verified: data.verified };
    return data;
  } catch (err) {
    console.log("Auth failed");
    res.status(401).json({ error: "Invalid token" });
    return null;
  }
};

// requires valid token + verified email
export const middleware = (req, res, next) => {
  const data = parseToken(req, res);
  if (!data) return;

  if (!data.verified) {
    return res.status(403).json({ error: "Email not verified" });
  }

  next();
};

// requires valid token only (unverified users allowed)
export const authOnly = (req, res, next) => {
  const data = parseToken(req, res);
  if (!data) return;
  next();
};
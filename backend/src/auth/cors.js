import cors from "cors";

export const corsConfig = () => {
  if (!process.env.ENABLE_CORS) {
    return cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    });
  } else {
    return cors();
  }
};
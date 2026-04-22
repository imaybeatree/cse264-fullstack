import nodemailer from "nodemailer";

const isProd = process.env.SMTP_USER && process.env.SMTP_PASS;

export const transporter = isProd ? 
// production mail service
nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
}) : 
// mailhog for dev
nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
});
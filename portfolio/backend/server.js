require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, "messages.json");
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim());

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "10kb" }));

// Max 5 messages per IP every 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages. Please try again later." },
});

// Email is optional: if SMTP vars are missing, messages are only saved to file.
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;
const transporter =
  SMTP_HOST && SMTP_USER && SMTP_PASS && MAIL_TO
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT || 587),
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
    : null;

const readMessages = () => {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return [];
  }
};

app.get("/api/health", (_req, res) =>
  res.json({ status: "ok", email: Boolean(transporter) })
);

app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body || {};

  if ([name, email, message].some((v) => typeof v !== "string" || !v.trim())) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (name.length > 100 || email.length > 200 || message.length > 2000) {
    return res.status(400).json({ error: "One of the fields is too long." });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email." });
  }

  const entry = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    date: new Date().toISOString(),
  };

  let delivered = false;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Portfolio Contact" <${SMTP_USER}>`,
        to: MAIL_TO,
        replyTo: entry.email,
        subject: `New portfolio message from ${entry.name.replace(/[\r\n]+/g, " ")}`,
        text: `Name: ${entry.name}\nEmail: ${entry.email}\n\n${entry.message}`,
      });
      delivered = true;
    } catch (err) {
      console.error("Email failed:", err.message);
    }
  }

  // Backup copy on disk (may not persist on some hosting platforms)
  try {
    const messages = readMessages();
    messages.push(entry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));
    delivered = true;
  } catch (err) {
    console.error("Could not save message:", err.message);
  }

  if (!delivered) {
    return res
      .status(500)
      .json({ error: "Could not send your message. Please try again later." });
  }
  res.status(201).json({ message: "Thanks! Your message has been received." });
});

app.use((_req, res) => res.status(404).json({ error: "Not found" }));

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));

// app.js
import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import participantRoutes from "./routes/participantRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the router

app.use("/auth", authRoutes);
app.use("/api", participantRoutes);
app.use("/api", volunteerRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

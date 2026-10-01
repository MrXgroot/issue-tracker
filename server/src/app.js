const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/users/user.routes");
const issueRoutes = require("./modules/issues/issue.routes");
const commentRoutes = require("./modules/comments/comment.routes");

const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();
console.log("CLIENT_URL:", process.env.CLIENT_URL);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    message: "Issue Tracker API is running",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/issues", issueRoutes);
app.use("/api/v1", commentRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;

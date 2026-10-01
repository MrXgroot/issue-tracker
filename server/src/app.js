const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/users/user.routes");
const issueRoutes = require("./modules/issues/issue.routes");
const commentRoutes = require("./modules/comments/comment.routes");

const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();
const allowedOrigins = [
  "https://issue-tracker-dun-kappa.vercel.app",
  "https://issue-tracker-g5vj77wac-sukeshachar1489-3630.vercel.app",
];

//vercel changing url again and again
// todo: remove the hardcoded urls
app.use(
  cors({
    origin: allowedOrigins,
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

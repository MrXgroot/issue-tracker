const express = require("express");

const commentController = require("./comment.controller");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/issues/:issueId/comments", commentController.getIssueComments);

router.post("/issues/:issueId/comments", commentController.createComment);

router.delete("/comments/:id", commentController.deleteComment);

module.exports = router;

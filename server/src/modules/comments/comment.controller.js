const commentService = require("./comment.service");

const commentController = {
  async createComment(req, res) {
    const comment = await commentService.createComment({
      issueId: req.params.issueId,
      userId: req.user._id,
      text: req.body.text,
    });

    res.status(201).json({
      success: true,
      data: comment,
    });
  },

  async getIssueComments(req, res) {
    const comments = await commentService.getIssueComments(req.params.issueId);

    res.json({
      success: true,
      data: comments,
    });
  },

  async deleteComment(req, res) {
    const comment = await commentService.deleteComment(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    res.json({
      success: true,
      message: "Comment deleted",
    });
  },
};

module.exports = commentController;

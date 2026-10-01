const commentRepository = require("./comment.repository");

const commentService = {
  createComment({ issueId, userId, text }) {
    return commentRepository.create({
      issue: issueId,
      author: userId,
      text,
    });
  },

  getIssueComments(issueId) {
    return commentRepository.findByIssueId(issueId);
  },

  deleteComment(id) {
    return commentRepository.deleteById(id);
  },
};

module.exports = commentService;

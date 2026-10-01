const Comment = require("./comment.model");

const commentRepository = {
  async create(data) {
    const comment = await Comment.create(data);
    return comment.populate("author", "name email");
  },

  findByIssueId(issueId) {
    return Comment.find({ issue: issueId })
      .populate("author", "name email")
      .sort({ createdAt: 1 });
  },

  deleteById(id) {
    return Comment.findByIdAndDelete(id);
  },
};

module.exports = commentRepository;

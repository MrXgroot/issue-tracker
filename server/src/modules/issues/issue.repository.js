const Issue = require("./issue.model");

const issueRepository = {
  create(data) {
    return Issue.create(data);
  },

  findById(id) {
    return Issue.findById(id)
      .populate("assignee", "name email")
      .populate("createdBy", "name email");
  },

  findAll(filters = {}) {
    return Issue.find(filters)
      .populate("assignee", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
  },

  updateById(id, data) {
    return Issue.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .populate("assignee", "name email")
      .populate("createdBy", "name email");
  },

  deleteById(id) {
    return Issue.findByIdAndDelete(id);
  },

  countByStatus() {
    return Issue.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
  },
};

module.exports = issueRepository;

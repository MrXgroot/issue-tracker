const issueRepository = require("./issue.repository");

const issueService = {
  createIssue(data, userId) {
    return issueRepository.create({
      ...data,
      createdBy: userId,
    });
  },

  getIssues({ status, assignedTo, search }) {
    const filters = {};

    if (status) {
      filters.status = status;
    }

    if (assignedTo) {
      filters.assignee = assignedTo;
    }

    if (search) {
      filters.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    return issueRepository.findAll(filters);
  },

  getIssueById(id) {
    return issueRepository.findById(id);
  },

  updateIssue(id, data) {
    return issueRepository.updateById(id, data);
  },

  deleteIssue(id) {
    return issueRepository.deleteById(id);
  },

  async getDashboardSummary() {
    const result = await issueRepository.countByStatus();

    const summary = {
      total: 0,
      open: 0,
      inProgress: 0,
      closed: 0,
    };

    result.forEach((item) => {
      summary.total += item.count;

      if (item._id === "Open") {
        summary.open = item.count;
      }

      if (item._id === "In Progress") {
        summary.inProgress = item.count;
      }

      if (item._id === "Closed") {
        summary.closed = item.count;
      }
    });

    return summary;
  },
};

module.exports = issueService;

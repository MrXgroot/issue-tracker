const issueService = require("./issue.service");

const issueController = {
  async createIssue(req, res) {
    const issue = await issueService.createIssue(req.body, req.user._id);

    res.status(201).json({
      success: true,
      data: issue,
    });
  },

  async getIssues(req, res) {
    const issues = await issueService.getIssues({
      status: req.query.status,
      assignedTo: req.query.assignedTo,
      search: req.query.search,
    });

    res.json({
      success: true,
      data: issues,
    });
  },

  async getIssueById(req, res) {
    const issue = await issueService.getIssueById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.json({
      success: true,
      data: issue,
    });
  },

  async updateIssue(req, res) {
    const issue = await issueService.updateIssue(req.params.id, req.body);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.json({
      success: true,
      data: issue,
    });
  },

  async deleteIssue(req, res) {
    const issue = await issueService.deleteIssue(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.json({
      success: true,
      message: "Issue deleted",
    });
  },

  async getDashboardSummary(req, res) {
    const summary = await issueService.getDashboardSummary();

    res.json({
      success: true,
      data: summary,
    });
  },
};

module.exports = issueController;

const express = require("express");

const issueController = require("./issue.controller");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/dashboard-summary", issueController.getDashboardSummary);

router.post("/", issueController.createIssue);

router.get("/", issueController.getIssues);

router.get("/:id", issueController.getIssueById);

router.patch("/:id", issueController.updateIssue);

router.delete("/:id", issueController.deleteIssue);

module.exports = router;

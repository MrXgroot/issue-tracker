export const commentQueryKeys = {
  all: ["comments"],

  byIssue: (issueId) => ["comments", "issue", issueId],
};

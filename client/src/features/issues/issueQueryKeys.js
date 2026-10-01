export const issueQueryKeys = {
  all: ["issues"],
  list: (filters) => ["issues", "list", filters || {}],
  detail: (id) => ["issues", "detail", id],
  summary: ["issues", "summary"],
};

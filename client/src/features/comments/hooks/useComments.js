import { useQuery } from "@tanstack/react-query";
import { getIssueComments } from "../api/commentApi";
import { commentQueryKeys } from "../commentQueryKeys";

export function useComments(issueId) {
  return useQuery({
    queryKey: commentQueryKeys.byIssue(issueId),
    queryFn: () => getIssueComments(issueId),
    enabled: !!issueId,
  });
}

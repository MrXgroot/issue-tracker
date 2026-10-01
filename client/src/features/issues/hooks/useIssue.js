import { useQuery } from "@tanstack/react-query";
import { getIssueById } from "../api/issueApi";
import { issueQueryKeys } from "../issueQueryKeys";

export function useIssue(issueId) {
  return useQuery({
    queryKey: issueQueryKeys.detail(issueId),
    queryFn: () => getIssueById(issueId),
    enabled: !!issueId,
  });
}

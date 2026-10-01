import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../api/issueApi";
import { issueQueryKeys } from "../issueQueryKeys";

export function useIssues(filters = {}) {
  return useQuery({
    queryKey: issueQueryKeys.list(filters),
    queryFn: () => getIssues(filters),
  });
}

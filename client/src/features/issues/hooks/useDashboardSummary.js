import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../api/issueApi";
import { issueQueryKeys } from "../issueQueryKeys";

export function useDashboardSummary() {
  return useQuery({
    queryKey: issueQueryKeys.summary,
    queryFn: getDashboardSummary,
  });
}

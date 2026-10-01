import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getIssues,
  getDashboardSummary,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
} from "../api/issueApi";
import { issueQueryKeys } from "../issueQueryKeys";

export function useIssues(filters = {}) {
  return useQuery({
    queryKey: issueQueryKeys.list(filters),
    queryFn: () => getIssues(filters),
  });
}

export function useDashboardSummary() {
  return useQuery({
    queryKey: issueQueryKeys.summary,
    queryFn: getDashboardSummary,
  });
}

export function useIssue(issueId) {
  return useQuery({
    queryKey: issueQueryKeys.detail(issueId),
    queryFn: () => getIssueById(issueId),
    enabled: !!issueId,
  });
}

export function useCreateIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: issueQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: issueQueryKeys.summary });
    },
  });
}

export function useUpdateIssue(issueId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: issueQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: issueQueryKeys.summary });
      if (issueId) {
        queryClient.invalidateQueries({
          queryKey: issueQueryKeys.detail(issueId),
        });
      }
    },
  });
}

export function useDeleteIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: issueQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: issueQueryKeys.summary });
    },
  });
}

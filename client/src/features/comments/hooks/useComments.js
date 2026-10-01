import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getIssueComments,
  createComment,
  deleteComment,
} from "../api/commentApi";

export const commentQueryKeys = {
  byIssue: (issueId) => ["comments", issueId],
};

export function useComments(issueId) {
  return useQuery({
    queryKey: commentQueryKeys.byIssue(issueId),
    queryFn: () => getIssueComments(issueId),
    enabled: !!issueId,
  });
}

export function useCreateComment(issueId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentQueryKeys.byIssue(issueId),
      });
    },
  });
}

export function useDeleteComment(issueId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentQueryKeys.byIssue(issueId),
      });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../api/commentApi";
import { commentQueryKeys } from "../commentQueryKeys";

export function useCreateComment(issueId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,

    async onMutate(newComment) {
      await queryClient.cancelQueries({
        queryKey: commentQueryKeys.byIssue(issueId),
      });

      const previousComments = queryClient.getQueryData(
        commentQueryKeys.byIssue(issueId),
      );

      const optimisticComment = {
        _id: `optimistic-${Date.now()}`,
        ...newComment,
        issueId,
        createdAt: new Date().toISOString(),
        _optimistic: true,
      };

      queryClient.setQueryData(commentQueryKeys.byIssue(issueId), (old) => ({
        ...(old ?? {}),
        data: [...(old?.data ?? []), optimisticComment],
      }));

      return {
        previousComments,
      };
    },

    onError(error, newComment, context) {
      queryClient.setQueryData(
        commentQueryKeys.byIssue(issueId),
        context?.previousComments,
      );
    },

    onSettled() {
      queryClient.invalidateQueries({
        queryKey: commentQueryKeys.byIssue(issueId),
      });
    },
  });
}

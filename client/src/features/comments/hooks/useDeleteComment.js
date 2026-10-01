import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../api/commentApi";
import { commentQueryKeys } from "../commentQueryKeys";

export function useDeleteComment(issueId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,

    async onMutate(commentId) {
      await queryClient.cancelQueries({
        queryKey: commentQueryKeys.byIssue(issueId),
      });

      const previousComments = queryClient.getQueryData(
        commentQueryKeys.byIssue(issueId),
      );

      queryClient.setQueryData(commentQueryKeys.byIssue(issueId), (old) => ({
        ...(old ?? {}),
        data: (old?.data ?? []).filter((comment) => comment._id !== commentId),
      }));

      return {
        previousComments,
      };
    },

    onError(error, commentId, context) {
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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIssue } from "../api/issueApi";
import { issueQueryKeys } from "../issueQueryKeys";

export function useDeleteIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteIssue,

    async onMutate(issueId) {
      await queryClient.cancelQueries({
        queryKey: issueQueryKeys.all,
      });

      const previousQueries = queryClient.getQueriesData({
        queryKey: issueQueryKeys.all,
      });

      queryClient.setQueriesData(
        { queryKey: issueQueryKeys.all },
        (oldData) => {
          if (!Array.isArray(oldData)) {
            return oldData;
          }

          return oldData.filter((issue) => issue.id !== issueId);
        },
      );

      return {
        previousQueries,
      };
    },

    onError(error, issueId, context) {
      context?.previousQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled(error, issueId) {
      queryClient.invalidateQueries({
        queryKey: issueQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: issueQueryKeys.summary,
      });

      queryClient.removeQueries({
        queryKey: issueQueryKeys.detail(issueId),
      });
    },
  });
}

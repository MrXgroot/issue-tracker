import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIssue } from "../api/issueApi";
import { issueQueryKeys } from "../issueQueryKeys";

export function useUpdateIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateIssue,

    async onMutate(updatedIssue) {
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

          return oldData.map((issue) =>
            issue.id === updatedIssue.id
              ? {
                  ...issue,
                  ...updatedIssue,
                }
              : issue,
          );
        },
      );

      queryClient.setQueryData(
        issueQueryKeys.detail(updatedIssue.id),
        (oldIssue) => {
          if (!oldIssue) {
            return oldIssue;
          }

          return {
            ...oldIssue,
            ...updatedIssue,
          };
        },
      );

      return {
        previousQueries,
      };
    },

    onError(error, updatedIssue, context) {
      context?.previousQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      queryClient.invalidateQueries({
        queryKey: issueQueryKeys.detail(updatedIssue.id),
      });
    },

    onSettled(error, updatedIssue) {
      queryClient.invalidateQueries({
        queryKey: issueQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: issueQueryKeys.summary,
      });

      queryClient.invalidateQueries({
        queryKey: issueQueryKeys.detail(updatedIssue.id),
      });
    },
  });
}

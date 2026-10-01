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
        {
          queryKey: issueQueryKeys.all,
        },
        (oldData) => {
          if (!oldData) return oldData;

          // If cache is directly an array
          if (Array.isArray(oldData)) {
            return oldData.filter((issue) => issue._id !== issueId);
          }

          // If cache is { data: [...] }
          if (Array.isArray(oldData.data)) {
            return {
              ...oldData,
              data: oldData.data.filter((issue) => issue._id !== issueId),
            };
          }

          return oldData;
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

    onSuccess(_data, issueId) {
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

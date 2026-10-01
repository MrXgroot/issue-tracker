import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIssue } from "../api/issueApi";
import { issueQueryKeys } from "../issueQueryKeys";

export function useCreateIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIssue,

    async onMutate(newIssue) {
      await queryClient.cancelQueries({
        queryKey: issueQueryKeys.all,
      });

      const previousQueries = queryClient.getQueriesData({
        queryKey: issueQueryKeys.all,
      });

      const optimisticIssue = {
        id: `optimistic-${Date.now()}`,
        ...newIssue,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        _optimistic: true,
      };

      queryClient.setQueriesData(
        { queryKey: issueQueryKeys.all },
        (oldData) => {
          if (!Array.isArray(oldData)) {
            return oldData;
          }

          return [optimisticIssue, ...oldData];
        },
      );

      return {
        previousQueries,
      };
    },

    onError(error, newIssue, context) {
      context?.previousQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled() {
      queryClient.invalidateQueries({
        queryKey: issueQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: issueQueryKeys.summary,
      });
    },
  });
}

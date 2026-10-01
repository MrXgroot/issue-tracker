import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api/userApi";
import { userQueryKeys } from "../userQueryKeys";

export function useUser(id) {
  return useQuery({
    queryKey: userQueryKeys.detail(id),
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
}

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/userApi";
import { userQueryKeys } from "../userQueryKeys";

export function useUsers(options = {}) {
  return useQuery({
    queryKey: userQueryKeys.all,
    queryFn: getUsers,
    ...options,
  });
}

import { useQuery } from "@tanstack/react-query";
import { getUsers, getUserById } from "../api/userApi";

export const userQueryKeys = {
  all: ["users"],
  detail: (id) => ["users", id],
};

export function useUsers(options = {}) {
  return useQuery({
    queryKey: userQueryKeys.all,
    queryFn: getUsers,
    ...options,
  });
}

export function useUser(id) {
  return useQuery({
    queryKey: userQueryKeys.detail(id),
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
}

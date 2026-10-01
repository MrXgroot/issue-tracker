import { useUsers } from "../features/users/hooks/useUsers";
import { useIssues } from "../features/issues/hooks/useIssues";
import { Loader2, Mail, Shield, CheckSquare, RefreshCw } from "lucide-react";

export default function TeamPage() {
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
    refetch: refetchUsers,
  } = useUsers();

  const { data: issuesData } = useIssues();

  const users = usersData?.data || [];
  const issues = issuesData?.data || [];

  // Calculate assigned issues per user
  const issueCountMap = {};
  issues.forEach((issue) => {
    if (issue.assignee?._id) {
      const id = issue.assignee._id;
      issueCountMap[id] = (issueCountMap[id] || 0) + 1;
    }
  });

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-2xs p-6 space-y-6">
        <div>
          <h2 className="text-base font-bold text-gray-900">Team Directory</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Registered team members available for issue assignment.
          </p>
        </div>

        {isUsersLoading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-2 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-xs">Loading team members...</span>
          </div>
        ) : isUsersError ? (
          <div className="py-16 text-center space-y-3">
            <p className="text-xs font-medium text-red-600">Couldn't load team directory</p>
            <button
              onClick={() => refetchUsers()}
              className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg transition inline-flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((u) => {
              const assignedCount = issueCountMap[u._id] || 0;
              return (
                <div
                  key={u._id}
                  className="p-5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition shadow-2xs space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                        {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-gray-900 truncate">
                          {u.name}
                        </h3>
                        <p className="text-[11px] text-gray-400 truncate flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 shrink-0" />
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 font-medium text-[10px]">
                      <Shield className="w-3 h-3" />
                      {u.role || "USER"}
                    </span>
                    <span className="text-gray-500 font-medium text-[11px] flex items-center gap-1">
                      <CheckSquare className="w-3.5 h-3.5 text-gray-400" />
                      {assignedCount} {assignedCount === 1 ? "issue" : "issues"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

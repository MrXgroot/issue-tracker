import { IssueTableToolbar } from "./IssueTableToolbar";
import { IssueTableRow } from "./IssueTableRow";
import {
  TableLoadingState,
  TableErrorState,
  TableEmptyState,
} from "./IssueTableStates";
import { IssueTableFooter } from "./IssueTableFooter";

export function IssueTable({
  issues = [],
  isLoading = false,
  isError = false,
  refetch,
  activeTab = "All",
  onTabChange,
  searchQuery = "",
  onSearchChange,
  onSelectIssue,
  onDeleteIssue,
  onOpenCreateModal,
  showTabs = true,
  showSearch = true,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all">
      <IssueTableToolbar
        showTabs={showTabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
        showSearch={showSearch}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onOpenCreateModal={onOpenCreateModal}
      />

      <div className="overflow-x-auto">
        {isLoading ? (
          <TableLoadingState />
        ) : isError ? (
          <TableErrorState onRetry={refetch} />
        ) : issues.length === 0 ? (
          <TableEmptyState onOpenCreateModal={onOpenCreateModal} />
        ) : (
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 pl-6 pr-4">Ticket</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Assignee</th>
                <th className="px-4 py-3">Date</th>
                <th className="py-3 pl-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {issues.map((issue) => (
                <IssueTableRow
                  key={issue._id}
                  issue={issue}
                  onSelectIssue={onSelectIssue}
                  onDeleteIssue={onDeleteIssue}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!isLoading && !isError && issues.length > 0 && (
        <IssueTableFooter count={issues.length} onRefresh={refetch} />
      )}
    </div>
  );
}

export default IssueTable;

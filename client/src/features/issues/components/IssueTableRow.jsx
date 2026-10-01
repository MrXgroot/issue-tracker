import { Calendar, Eye, Trash2 } from "lucide-react";
import { IssueStatusBadge } from "./IssueStatusBadge";
import { IssuePriorityBadge } from "./IssuePriorityBadge";

export function IssueTableRow({ issue, onSelectIssue, onDeleteIssue }) {
  const shortId = `#${issue._id?.slice(-5).toUpperCase()}`;
  const formattedDate = new Date(issue.createdAt).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this issue?")) {
      onDeleteIssue?.(issue._id);
    }
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    onSelectIssue?.(issue._id);
  };

  return (
    <tr
      onClick={() => onSelectIssue?.(issue._id)}
      className="group cursor-pointer transition-colors duration-150 hover:bg-slate-50/80"
    >
      {/* ID & Title */}
      <td className="py-3.5 pl-6 pr-4">
        <div className="flex items-center gap-3">
          <span className="rounded-md border border-slate-200/70 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-500">
            {shortId}
          </span>
          <span className="max-w-[320px] truncate text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            {issue.title}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-3.5">
        <IssueStatusBadge status={issue.status} />
      </td>

      {/* Priority */}
      <td className="px-4 py-3.5">
        <IssuePriorityBadge priority={issue.priority} />
      </td>

      {/* Assignee */}
      <td className="px-4 py-3.5">
        {issue.assignee ? (
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-slate-800 to-slate-950 text-[10px] font-bold text-white shadow-2xs ring-2 ring-white">
              {issue.assignee.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <span className="text-xs font-medium text-slate-700">
              {issue.assignee.name}
            </span>
          </div>
        ) : (
          <span className="text-xs font-normal italic text-slate-400">
            Unassigned
          </span>
        )}
      </td>

      {/* Created Date */}
      <td className="px-4 py-3.5">
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
          <Calendar className="h-3 w-3 text-slate-400" />
          {formattedDate}
        </span>
      </td>

      {/* Actions */}
      <td className="py-3.5 pl-4 pr-6">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={handleSelect}
            className="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-800 active:scale-95"
            title="View details"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-600 active:scale-95"
            title="Delete issue"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

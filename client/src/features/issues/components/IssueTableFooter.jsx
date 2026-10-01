import { RefreshCw } from "lucide-react";

export function IssueTableFooter({ count = 0, onRefresh }) {
  return (
    <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-2.5">
      <p className="text-[11px] font-medium text-slate-400">
        Showing <span className="font-bold text-slate-700">{count}</span> issue
        {count === 1 ? "" : "s"}
      </p>

      {onRefresh && (
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 transition-colors hover:text-slate-900"
        >
          <RefreshCw className="h-3 w-3" />
          Refresh
        </button>
      )}
    </div>
  );
}

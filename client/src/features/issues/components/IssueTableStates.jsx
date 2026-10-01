import { Loader2, RefreshCw, Inbox, Plus } from "lucide-react";

export function TableLoadingState() {
  return (
    <div className="flex min-h-[340px] flex-col items-center justify-center gap-3 text-slate-400">
      <Loader2 className="h-7 w-7 animate-spin text-indigo-600" />
      <p className="text-xs font-medium tracking-wide text-slate-500">
        Synchronizing issues...
      </p>
    </div>
  );
}

export function TableErrorState({ onRetry }) {
  return (
    <div className="flex min-h-[340px] flex-col items-center justify-center gap-3 p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-8 ring-rose-50/50">
        <RefreshCw className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-bold text-slate-900">
          Failed to load issues
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Network error occurred while fetching your issue backlog.
        </p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry sync
        </button>
      )}
    </div>
  );
}

export function TableEmptyState({ onOpenCreateModal }) {
  return (
    <div className="flex min-h-[340px] flex-col items-center justify-center gap-3 p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-400">
        <Inbox className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">No issues found</p>
        <p className="mt-1 text-xs text-slate-400 max-w-xs">
          There are no open or matching tickets for your current filter
          parameters.
        </p>
      </div>
      {onOpenCreateModal && (
        <button
          type="button"
          onClick={onOpenCreateModal}
          className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
        >
          <Plus className="h-3.5 w-3.5" />
          Create Issue
        </button>
      )}
    </div>
  );
}

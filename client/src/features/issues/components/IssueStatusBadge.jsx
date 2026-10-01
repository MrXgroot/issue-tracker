export function IssueStatusBadge({ status }) {
  switch (status) {
    case "Open":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200/70 bg-sky-50/70 px-2.5 py-0.5 text-[11px] font-semibold text-sky-700 shadow-2xs backdrop-blur-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
          Open
        </span>
      );
    case "In Progress":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-amber-50/70 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 shadow-2xs backdrop-blur-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          In Progress
        </span>
      );
    case "Closed":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/70 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 shadow-2xs backdrop-blur-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Closed
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          {status || "Unknown"}
        </span>
      );
  }
}

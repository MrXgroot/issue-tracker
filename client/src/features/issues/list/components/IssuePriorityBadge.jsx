import { Flame, AlertTriangle, Minus } from "lucide-react";

export function IssuePriorityBadge({ priority }) {
  switch (priority) {
    case "High":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-md border border-rose-100 bg-rose-50/60 px-2 py-0.5 text-[11px] font-semibold text-rose-600">
          <Flame className="h-3 w-3 text-rose-500" />
          High
        </span>
      );
    case "Medium":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-100 bg-amber-50/60 px-2 py-0.5 text-[11px] font-semibold text-amber-600">
          <AlertTriangle className="h-3 w-3 text-amber-500" />
          Medium
        </span>
      );
    case "Low":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-100 bg-emerald-50/60 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
          <Minus className="h-3 w-3 text-emerald-500" />
          Low
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 rounded-md border border-slate-100 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500">
          {priority || "Normal"}
        </span>
      );
  }
}

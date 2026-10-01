import { Search, Plus } from "lucide-react";

const TABS = ["All", "Open", "In Progress", "Closed"];

export function IssueTableToolbar({
  showTabs = true,
  activeTab = "All",
  onTabChange,
  showSearch = true,
  searchQuery = "",
  onSearchChange,
  onOpenCreateModal,
}) {
  if (!showTabs && !showSearch && !onOpenCreateModal) return null;

  return (
    <div className="flex flex-col gap-3.5 border-b border-slate-100/90 bg-white/60 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
      {showTabs && (
        <div className="flex items-center gap-1 rounded-xl bg-slate-100/80 p-1 border border-slate-200/50">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onTabChange?.(tab)}
                className={`relative whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold tracking-tight transition-all duration-200 ${
                  isActive
                    ? "bg-white text-slate-900 shadow-2xs font-bold ring-1 ring-black/5"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex items-center gap-2.5">
        {showSearch && (
          <div className="group relative w-full sm:w-60">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Filter tickets..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-1.5 pl-8 pr-3 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>
        )}

        {onOpenCreateModal && (
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-950 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-150 hover:bg-slate-800 active:scale-[0.98]"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Issue</span>
          </button>
        )}
      </div>
    </div>
  );
}

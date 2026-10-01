import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Layers,
  AlertCircle,
  Clock,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

import {
  useDashboardSummary,
  useIssues,
  useDeleteIssue,
} from "../features/issues";

import { IssueTable } from "../features/issues/list/IssueTable";
const summaryCards = [
  {
    key: "total",
    label: "Total Issues",
    icon: Layers,
    iconClass: "text-slate-600",
    iconBg: "bg-slate-100/80",
    hoverBorder: "hover:border-slate-300",
    meta: "active pool",
  },
  {
    key: "open",
    label: "Open",
    icon: AlertCircle,
    iconClass: "text-blue-600",
    iconBg: "bg-blue-50",
    hoverBorder: "hover:border-blue-200",
    meta: "needs triage",
  },
  {
    key: "inProgress",
    label: "In Progress",
    icon: Clock,
    iconClass: "text-amber-600",
    iconBg: "bg-amber-50",
    hoverBorder: "hover:border-amber-200",
    meta: "in flight",
  },
  {
    key: "closed",
    label: "Closed",
    icon: CheckCircle2,
    iconClass: "text-emerald-600",
    iconBg: "bg-emerald-50",
    hoverBorder: "hover:border-emerald-200",
    meta: "resolved",
  },
];

export default function DashboardPage() {
  const { openCreateModal, openDetailModal } = useOutletContext();

  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // -----------------------------
  // Server state
  // -----------------------------

  const { data: summaryData } = useDashboardSummary();

  const summary = summaryData?.data ?? {
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  };

  const filters = {
    ...(activeTab !== "All" && {
      status: activeTab,
    }),
    ...(searchQuery.trim() && {
      search: searchQuery.trim(),
    }),
  };

  const {
    data: issuesData,
    isLoading: isIssuesLoading,
    isError,
    refetch,
  } = useIssues(filters);

  const issues = issuesData?.data ?? [];

  const deleteMutation = useDeleteIssue();

  // -----------------------------
  // Derived UI state
  // -----------------------------

  const completionPercentage =
    summary.total > 0 ? Math.round((summary.closed / summary.total) * 100) : 0;

  return (
    <div className="min-h-full bg-slate-50/70">
      <div className="space-y-6">
        {/* --------------------------------
            Page Header
        -------------------------------- */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Project Overview
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Real-time project metrics, issue status, and resolution progress.
            </p>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            <span>↻</span>
            Sync Data
          </button>
        </section>

        {/* --------------------------------
            Summary Cards
        -------------------------------- */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.key}
                className={`group rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md ${card.hoverBorder}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {card.label}
                  </span>

                  <div
                    className={`rounded-xl p-2 ${card.iconBg} ${card.iconClass} transition-colors`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <p className="text-3xl font-extrabold tracking-tight text-slate-900">
                    {summary[card.key]}
                  </p>

                  <span
                    className={`font-mono text-xs font-medium ${
                      card.key === "open"
                        ? "text-blue-600"
                        : card.key === "inProgress"
                          ? "text-amber-600"
                          : card.key === "closed"
                            ? "text-emerald-600"
                            : "text-slate-400"
                    }`}
                  >
                    {card.meta}
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        {/* --------------------------------
            Completion Banner
        -------------------------------- */}
        {summary.total > 0 && (
          <section className="rounded-2xl border border-slate-200/90 bg-gradient-to-r from-white via-slate-50/70 to-indigo-50/40 p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-indigo-600 p-2 text-white shadow-sm">
                  <TrendingUp className="h-4 w-4" />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Project Completion
                  </h2>

                  <p className="text-xs text-slate-500">
                    Tracking closed issues against the total backlog
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-indigo-100 px-2.5 py-1 font-mono text-xs font-bold text-indigo-700">
                  {completionPercentage}% closed
                </span>

                <span className="font-mono text-2xl font-black text-slate-900">
                  {completionPercentage}%
                </span>
              </div>
            </div>

            <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full border border-slate-200/60 bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 transition-all duration-700"
                style={{
                  width: `${completionPercentage}%`,
                }}
              />
            </div>
          </section>
        )}

        {/* --------------------------------
            Issues
        -------------------------------- */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Project Issues
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Filter, search, and manage project issues.
              </p>
            </div>
          </div>

          <IssueTable
            issues={issues}
            isLoading={isIssuesLoading}
            isError={isError}
            refetch={refetch}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectIssue={openDetailModal}
            onDeleteIssue={(id) => deleteMutation.mutate(id)}
            onOpenCreateModal={openCreateModal}
          />
        </section>
      </div>
    </div>
  );
}

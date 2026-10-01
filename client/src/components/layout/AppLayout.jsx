import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, Plus } from "lucide-react";

import Sidebar from "./Sidebar";
import { CreateIssueModal } from "../../features/issues";
import { IssueDetailModal } from "../../features/issues";
const pageHeaders = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Overview of project issues and milestones",
  },

  "/issues": {
    title: "All Issues",
    subtitle: "Manage and track every issue",
  },

  "/my-issues": {
    title: "My Assigned Issues",
    subtitle: "Issues currently assigned to you",
  },

  "/team": {
    title: "Team Directory",
    subtitle: "Project team members and issue distribution",
  },

  "/settings": {
    title: "Settings",
    subtitle: "System information and user settings",
  },
};

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState(null);

  const location = useLocation();

  const currentPage = pageHeaders[location.pathname] || {
    title: "Trackr",
    subtitle: "Issue Tracker System",
  };

  function openCreateModal() {
    setIsCreateModalOpen(true);
  }

  function closeCreateModal() {
    setIsCreateModalOpen(false);
  }

  function openDetailModal(issueId) {
    setSelectedIssueId(issueId);
  }

  function closeDetailModal() {
    setSelectedIssueId(null);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main application area */}
      <div className="flex min-h-screen flex-1 flex-col md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white px-4 shadow-sm md:px-8">
          <div className="flex h-full items-center justify-between">
            {/* Left side */}
            <div className="flex min-w-0 items-center gap-3">
              {/* Mobile menu */}
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Page title */}
              <div className="min-w-0">
                <h1 className="truncate text-base font-bold leading-tight text-slate-900">
                  {currentPage.title}
                </h1>

                <p className="hidden truncate text-xs text-slate-400 sm:block">
                  {currentPage.subtitle}
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />

                <span>New Issue</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="mx-auto flex w-full max-w-7xl flex-1 p-4 md:p-8">
          <div className="w-full">
            <Outlet
              context={{
                openCreateModal,
                openDetailModal,
              }}
            />
          </div>
        </main>
      </div>

      {/* Create Issue Modal */}
      <CreateIssueModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />

      {/* Issue Detail Modal */}
      {selectedIssueId && (
        <IssueDetailModal
          issueId={selectedIssueId}
          onClose={closeDetailModal}
        />
      )}
    </div>
  );
}

import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useIssues, useDeleteIssue } from "../features/issues";
import { useAuth } from "../features/auth/context/AuthContext";
import IssueTable from "../features/issues/list/IssueTable";

export default function MyIssuesPage() {
  const { user } = useAuth();
  const { openCreateModal, openDetailModal } = useOutletContext();

  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = {
    assignedTo: user?.id,
  };
  if (activeTab !== "All") {
    filters.status = activeTab;
  }
  if (searchQuery.trim()) {
    filters.search = searchQuery.trim();
  }

  const { data: issuesData, isLoading, isError, refetch } = useIssues(filters);
  const issues = issuesData?.data || [];

  const deleteMutation = useDeleteIssue();

  return (
    <div className="space-y-4">
      <IssueTable
        issues={issues}
        isLoading={isLoading}
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
    </div>
  );
}

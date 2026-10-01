import { useState, useEffect } from "react";
import { useIssue, useUpdateIssue, useDeleteIssue } from "../hooks/useIssues";
import { useUsers } from "../../users/hooks/useUsers";
import {
  useComments,
  useCreateComment,
  useDeleteComment,
} from "../../comments/hooks/useComments";
import { useAuth } from "../../auth/context/AuthContext";
import { X, Trash2, Loader2 } from "lucide-react";

export default function IssueDetailModal({ issueId, onClose }) {
  const { user: currentUser } = useAuth();

  const [commentText, setCommentText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    assignee: "",
  });

  // Feature hooks for server state
  const { data: issueData, isLoading: isIssueLoading } = useIssue(issueId);
  const issue = issueData?.data;

  useEffect(() => {
    if (issue) {
      setEditForm({
        title: issue.title || "",
        description: issue.description || "",
        priority: issue.priority || "Medium",
        assignee: issue.assignee?._id || issue.assignee || "",
      });
    }
  }, [issue]);

  const { data: usersData } = useUsers({ enabled: !!issueId });
  const users = usersData?.data || [];

  const { data: commentsData } = useComments(issueId);
  const comments = commentsData?.data || [];

  const updateMutation = useUpdateIssue(issueId);
  const deleteIssueMutation = useDeleteIssue();
  const addCommentMutation = useCreateComment(issueId);
  const deleteCommentMutation = useDeleteComment(issueId);

  if (!issueId) return null;

  function handleStatusChange(newStatus) {
    if (issue.status === newStatus) return;
    updateMutation.mutate({ id: issueId, data: { status: newStatus } });
  }

  function handleSaveEdit(e) {
    e.preventDefault();
    updateMutation.mutate(
      {
        id: issueId,
        data: {
          title: editForm.title,
          description: editForm.description,
          priority: editForm.priority,
          assignee: editForm.assignee || null,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  }

  function handleAddComment(e) {
    e.preventDefault();
    if (!commentText.trim()) return;
    addCommentMutation.mutate(
      { issueId, text: commentText.trim() },
      {
        onSuccess: () => {
          setCommentText("");
        },
      }
    );
  }

  function handleDeleteIssue() {
    if (confirm("Are you sure you want to delete this issue?")) {
      deleteIssueMutation.mutate(issueId, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  }

  function getPriorityBadge(priority) {
    switch (priority) {
      case "High":
        return "bg-red-50 text-red-700 border-red-200";
      case "Medium":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Low":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-400">
              #{issueId ? issueId.slice(-6).toUpperCase() : ""}
            </span>
            {issue && (
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-md border ${getPriorityBadge(
                  issue.priority
                )}`}
              >
                {issue.priority} Priority
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDeleteIssue}
              title="Delete issue"
              disabled={deleteIssueMutation.isPending}
              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {isIssueLoading ? (
            <div className="py-12 flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : issue ? (
            <>
              {/* Status Selector Bar */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-medium text-gray-500">Status</span>
                <div className="flex items-center gap-1.5">
                  {["Open", "In Progress", "Closed"].map((st) => {
                    const isActive = issue.status === st;
                    return (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(st)}
                        disabled={updateMutation.isPending}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                          isActive
                            ? "bg-gray-900 text-white shadow-xs"
                            : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detail View / Edit Form */}
              {!isEditing ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h1 className="text-lg font-semibold text-gray-900 leading-snug">
                      {issue.title}
                    </h1>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-2.5 py-1 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition shrink-0"
                    >
                      Edit Details
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                    {issue.description || "No description provided."}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-xs">
                    <div>
                      <span className="text-gray-400 block mb-0.5">Assignee</span>
                      <span className="font-medium text-gray-800">
                        {issue.assignee?.name || "Unassigned"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-0.5">Created By</span>
                      <span className="font-medium text-gray-800">
                        {issue.createdBy?.name || "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveEdit} className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Edit Issue
                  </h3>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, title: e.target.value }))
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-900 bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-900 bg-white resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <select
                        value={editForm.priority}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            priority: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Assignee
                      </label>
                      <select
                        value={editForm.assignee}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            assignee: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
                      >
                        <option value="">Unassigned</option>
                        {users.map((u) => (
                          <option key={u._id} value={u._id}>
                            {u.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-200 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={updateMutation.isPending}
                      className="px-3 py-1.5 text-xs text-white bg-gray-900 hover:bg-gray-800 rounded-lg"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}

              {/* Activity & Comments Section */}
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <h3 className="text-xs font-semibold text-gray-900 tracking-tight">
                  Activity & Comments ({comments.length})
                </h3>

                {/* Comment list */}
                <div className="space-y-3">
                  {comments.length === 0 ? (
                    <p className="text-xs text-gray-400 italic">
                      No comments yet. Leave a reply below.
                    </p>
                  ) : (
                    comments.map((c) => (
                      <div
                        key={c._id}
                        className="p-3 rounded-lg bg-gray-50 border border-gray-100 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1 text-xs min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">
                              {c.author?.name || "Unknown"}
                            </span>
                            <span className="text-[11px] text-gray-400">
                              {new Date(c.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-700 text-xs leading-normal">
                            {c.text}
                          </p>
                        </div>
                        {(currentUser?.id === c.author?._id ||
                          currentUser?.id === c.author) && (
                          <button
                            onClick={() => deleteCommentMutation.mutate(c._id)}
                            className="text-gray-400 hover:text-red-500 p-1 transition"
                            title="Delete comment"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Add Comment Input */}
                <form onSubmit={handleAddComment} className="pt-2 flex gap-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:border-gray-900"
                  />
                  <button
                    type="submit"
                    disabled={addCommentMutation.isPending || !commentText.trim()}
                    className="px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 transition flex items-center gap-1 shrink-0"
                  >
                    {addCommentMutation.isPending ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      "Reply"
                    )}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <p className="text-center text-sm text-gray-500">Issue not found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useCreateIssue } from "../hooks/useIssues";
import { useUsers } from "../../users/hooks/useUsers";
import { X, Loader2 } from "lucide-react";

export default function CreateIssueModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
    assignee: "",
  });

  const [error, setError] = useState("");

  const { data: usersData } = useUsers({ enabled: isOpen });
  const users = usersData?.data || [];

  const createMutation = useCreateIssue();

  function handleClose() {
    setForm({
      title: "",
      description: "",
      priority: "Medium",
      status: "Open",
      assignee: "",
    });
    setError("");
    onClose();
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }

    const payload = {
      ...form,
      assignee: form.assignee || null,
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        handleClose();
      },
      onError: (err) => {
        setError(
          err.response?.data?.message || "Failed to create issue. Try again."
        );
      },
    });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Create New Issue</h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-xs rounded-lg bg-red-50 border border-red-200 text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Brief summary of the issue"
              required
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Provide more details about the issue..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 bg-white"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Assignee
            </label>
            <select
              name="assignee"
              value={form.assignee}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 bg-white"
            >
              <option value="">Unassigned</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="px-4 py-2 text-xs font-medium text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-60 rounded-lg transition flex items-center gap-1.5"
            >
              {createMutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Create Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

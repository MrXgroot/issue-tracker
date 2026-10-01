import { useAuth } from "../features/auth/context/AuthContext";
import { User, Server, Shield, Layers } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Profile Info */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-2xs p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
          <User className="w-5 h-5 text-gray-700" />
          <h2 className="text-sm font-bold text-gray-900">User Account</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-100 space-y-1">
            <span className="text-gray-400 font-medium block">Full Name</span>
            <span className="font-semibold text-gray-900 block">{user?.name || "N/A"}</span>
          </div>

          <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-100 space-y-1">
            <span className="text-gray-400 font-medium block">Email Address</span>
            <span className="font-semibold text-gray-900 block truncate">{user?.email || "N/A"}</span>
          </div>

          <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-100 space-y-1">
            <span className="text-gray-400 font-medium block">Role</span>
            <span className="font-semibold text-gray-900 block">{user?.role || "USER"}</span>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-2xs p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
          <Server className="w-5 h-5 text-gray-700" />
          <h2 className="text-sm font-bold text-gray-900">System Environment</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-100 space-y-1">
            <span className="text-gray-400 font-medium block">Application Name</span>
            <span className="font-semibold text-gray-900 block">Trackr</span>
          </div>

          <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-100 space-y-1">
            <span className="text-gray-400 font-medium block">API Base Endpoint</span>
            <span className="font-mono text-gray-800 block">/api/v1</span>
          </div>

          <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-100 space-y-1">
            <span className="text-gray-400 font-medium block">Database Status</span>
            <span className="font-semibold text-emerald-600 block">Connected (MongoDB)</span>
          </div>

          <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-100 space-y-1">
            <span className="text-gray-400 font-medium block">Frontend Stack</span>
            <span className="font-semibold text-gray-900 block">React + Vite + Tailwind CSS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

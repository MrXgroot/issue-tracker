import { useEffect, useState } from "react";
import api from "../../lib/axios";

const MAX_WAIT_TIME = 30_000;
const RETRY_INTERVAL = 3_000;

export default function BackendHealthProvider({ children }) {
  const [status, setStatus] = useState("checking");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let mounted = true;
    let retryTimer;
    let elapsedTimer;

    const startTime = Date.now();

    async function checkHealth() {
      if (!mounted) return;

      try {
        await api.get("/health", {
          timeout: 5_000,
        });

        if (mounted) {
          setStatus("healthy");
        }
      } catch {
        const elapsed = Date.now() - startTime;

        if (elapsed >= MAX_WAIT_TIME) {
          if (mounted) {
            setStatus("failed");
          }
          return;
        }

        retryTimer = setTimeout(checkHealth, RETRY_INTERVAL);
      }
    }

    elapsedTimer = setInterval(() => {
      if (!mounted) return;

      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setSeconds(Math.min(elapsed, 30));
    }, 1000);

    checkHealth();

    return () => {
      mounted = false;
      clearTimeout(retryTimer);
      clearInterval(elapsedTimer);
    };
  }, []);

  if (status === "healthy") {
    return children;
  }

  if (status === "failed") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">
            Server is taking longer than expected
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            The backend may be waking up. Please wait about 30 seconds and try
            again.
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

        <h1 className="mt-5 text-lg font-bold text-slate-900">
          Starting Trackr...
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Connecting to the server. It may take up to 30 seconds to wake up.
        </p>

        <div className="mt-4 text-xs font-medium text-slate-400">
          {seconds}s / 30s
        </div>
      </div>
    </div>
  );
}

import { QueryClientProvider } from "@tanstack/react-query";

import queryClient from "../lib/queryClient";
import { AuthProvider } from "../features/auth/context/AuthContext";

import BackendHealthGuard from "./providers/BackendHealthGuard";
import AppRouter from "./router/AppRouter";

export default function App() {
  return (
    <BackendHealthGuard>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </BackendHealthGuard>
  );
}

"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Lightweight react-query provider scoped to the pricing page.
 *
 * PricingContent uses useQueryClient/useQuery for the upgrade mutation, but
 * the marketing layout doesn't wrap in AppProviders (which would trigger an
 * unnecessary /api/auth/me fetch on every public page). This client wrapper
 * provides the QueryClient without the app-specific providers.
 */
export function PricingQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

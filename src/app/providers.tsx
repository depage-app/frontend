"use client";

import * as React from "react";
import { WagmiConfig } from "wagmi";

import { config } from "~/lib/wagmi";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={config}>
      {mounted && (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )}
    </WagmiConfig>
  );
}

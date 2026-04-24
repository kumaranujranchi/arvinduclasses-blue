"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from "react-hot-toast";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexProvider client={convex}>
      {children}
      <Toaster position="top-right" />
    </ConvexProvider>
  );
}

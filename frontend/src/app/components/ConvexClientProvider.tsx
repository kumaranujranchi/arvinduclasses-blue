"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const AIChatBot = dynamic(() => import("./AIChatBot"), { ssr: false });

export function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexProvider client={convex}>
      {children}
      <Toaster position="top-right" />
      <AIChatBot />
    </ConvexProvider>
  );
}

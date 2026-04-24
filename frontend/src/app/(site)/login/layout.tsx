import type { ReactNode } from "react";
import { ConvexClientProvider } from "../../components/ConvexClientProvider";
import "../../globals.css";

// Login page ka alag layout — no sticky buttons, no notice bar
export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <ConvexClientProvider>
      {children}
    </ConvexClientProvider>
  );
}

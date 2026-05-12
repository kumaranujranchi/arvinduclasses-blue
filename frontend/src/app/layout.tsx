import type { Metadata } from "next";
import { ConvexClientProvider } from "./components/ConvexClientProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arvindu Classes - Best Educational Environment",
  description: "Arvindu Classes provides quality education with expert teachers, skill-based scholarships, and online learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/assets/images/arvindu-favicon.png" type="image/png" />
        
        {/* Vendor CSS - Loaded in head for stability */}
        <link rel="stylesheet" href="/assets/css/plugins/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/fontawesome.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/default.css" />
        <link rel="stylesheet" href="/assets/css/plugins/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/slick.css" />
        <link rel="stylesheet" href="/assets/css/plugins/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/style.min.css" />
      </head>
      <body>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}

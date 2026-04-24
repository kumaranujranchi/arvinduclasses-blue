import type { Metadata } from "next";
import Script from "next/script";
import { ConvexClientProvider } from "./components/ConvexClientProvider";
import StickyButtons from "./components/StickyButtons";
import NoticeBar from "./components/NoticeBar";
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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/assets/images/arvindu-favicon.png" type="image/png" />

        {/* Vendor CSS */}
        <link rel="stylesheet" href="/assets/css/plugins/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/fontawesome.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/default.css" />

        {/* Plugin CSS */}
        <link rel="stylesheet" href="/assets/css/plugins/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/slick.css" />
        <link rel="stylesheet" href="/assets/css/plugins/magnific-popup.css" />

        {/* Main Style */}
        <link rel="stylesheet" href="/assets/css/style.min.css" />
      </head>
      <body>
        <ConvexClientProvider>
          <NoticeBar />
          {children}
          <StickyButtons />
        </ConvexClientProvider>

        {/* Vendor JS */}
        <Script src="/assets/js/vendor/jquery-3.6.0.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/vendor/modernizr-3.7.1.min.js" strategy="beforeInteractive" />

        {/* Plugin JS */}
        <Script src="/assets/js/plugins/popper.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/bootstrap.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/slick.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/jquery.magnific-popup.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/imagesloaded.pkgd.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/isotope.pkgd.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/wow.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins/ajax-contact.js" strategy="lazyOnload" />

        {/* Main Activation JS */}
        <Script src="/assets/js/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}

import Script from "next/script";
import { ConvexClientProvider } from "../components/ConvexClientProvider";
import StickyButtons from "../components/StickyButtons";
import NoticeBar from "../components/NoticeBar";
import "../globals.css";

// Legacy CSS Imports - Moved to src to prevent FOUC (flickering)
import "@/assets/css/plugins/bootstrap.min.css";
import "@/assets/css/plugins/fontawesome.min.css";
import "@/assets/css/plugins/default.css";
import "@/assets/css/plugins/animate.min.css";
import "@/assets/css/plugins/slick.css";
import "@/assets/css/plugins/magnific-popup.css";
import "@/assets/css/style.min.css";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>
        <NoticeBar />
        {children}
        <StickyButtons />
      </div>

      {/* Vendor JS - Only for Site Pages */}
      <Script src="/assets/js/vendor/jquery-3.6.0.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/vendor/modernizr-3.7.1.min.js" strategy="beforeInteractive" />

      {/* Plugin JS */}
      <Script src="/assets/js/plugins/popper.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/bootstrap.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/slick.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/jquery.magnific-popup.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/isotope.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/wow.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/ajax-contact.js" strategy="afterInteractive" />

      {/* Main Activation JS */}
      <Script src="/assets/js/main.js" strategy="afterInteractive" />
    </>
  );
}

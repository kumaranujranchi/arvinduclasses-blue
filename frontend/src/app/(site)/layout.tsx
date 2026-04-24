import Script from "next/script";
import StickyButtons from "../components/StickyButtons";
import NoticeBar from "../components/NoticeBar";
import "../globals.css";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Vendor CSS - data-precedence ensures Next.js hoists these to <head> */}
      <link rel="stylesheet" href="/assets/css/plugins/bootstrap.min.css" data-precedence="bootstrap" />
      <link rel="stylesheet" href="/assets/css/plugins/fontawesome.min.css" data-precedence="fontawesome" />
      <link rel="stylesheet" href="/assets/css/plugins/default.css" data-precedence="default" />
      <link rel="stylesheet" href="/assets/css/plugins/animate.min.css" data-precedence="animate" />
      <link rel="stylesheet" href="/assets/css/plugins/slick.css" data-precedence="slick" />
      <link rel="stylesheet" href="/assets/css/plugins/magnific-popup.css" data-precedence="magnific" />
      <link rel="stylesheet" href="/assets/css/style.min.css" data-precedence="theme" />

      <div>
        <NoticeBar />
        {children}
        <StickyButtons />
      </div>

      {/* Vendor JS */}
      <Script src="/assets/js/vendor/jquery-3.6.0.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/vendor/modernizr-3.7.1.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/plugins/popper.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/bootstrap.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/slick.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/jquery.magnific-popup.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/isotope.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/wow.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/plugins/ajax-contact.js" strategy="afterInteractive" />
      <Script src="/assets/js/main.js" strategy="afterInteractive" />
    </>
  );
}

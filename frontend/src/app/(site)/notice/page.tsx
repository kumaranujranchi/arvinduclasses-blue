"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function NoticePage() {
  const notices = useQuery(api.notices.getAll);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <>
      <Header />

      {/* ====== Page Banner Start ====== */}
      <section className="page-banner">
        <div className="page-banner-bg bg_cover banner-bg-notice">
          <div className="container">
            <div className="banner-content text-center">
              <h2 className="title text-white">Notice Board</h2>
              <p className="text-white mt-10">Stay updated with latest announcements and news from Arvindu Classes</p>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Page Banner Ends ====== */}

      {/* ====== Notice Board Section Start ====== */}
      <section className="notice-list-area pt-80 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {notices === undefined ? (
                // Loading State
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : notices.length === 0 ? (
                // Empty State
                <div className="text-center py-5">
                  <i className="fas fa-bullhorn fa-4x mb-3 text-muted"></i>
                  <h3 className="mt-3">No active notices at the moment.</h3>
                  <p>Please check back later for new updates and announcements.</p>
                </div>
              ) : (
                // Notice List
                notices.map((notice) => (
                  <div 
                    key={notice._id} 
                    className={`notice-card ${notice.isImportant ? 'important' : ''}`}
                  >
                    <div className="notice-date">
                      <i className="far fa-calendar-alt"></i>
                      {formatDate(notice.createdAt)}
                    </div>
                    <h3 className="notice-title">
                      {notice.title}
                      {notice.isImportant && (
                        <span className="important-badge">Important</span>
                      )}
                    </h3>
                    <div className="notice-content">
                      {notice.content}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
      {/* ====== Notice Board Section Ends ====== */}

      <Footer />

      {/* ====== Back To Top ====== */}
      <a href="#" className="back-to-top">
        <i className="fa fa-chevron-up"></i>
      </a>
    </>
  );
}

"use client";

import React from 'react';
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const NoticeBar = () => {
  const notices = useQuery(api.notices.getAll);

  // Fallback notices if none in DB or loading
  const defaultNotices = [
    "Admissions Open for Academic Session 2024-25",
    "Join our Foundation Program for Class 6-8",
    "Special Coaching for CBSE & ICSE Board Exams",
    "Enroll in B.Com Academic Support with Sukrishna Commerce",
    "Book your Free Demo Class today at Arvindu Classes"
  ];

  const displayNotices = notices && notices.length > 0 
    ? notices.map(n => n.content) 
    : defaultNotices;

  // Duplicate the notices to ensure a smooth continuous loop
  const tickerItems = [...displayNotices, ...displayNotices];

  return (
    <div className="notice-bar-wrapper">
      <div className="notice-bar-container">
        <div className="notice-label">
          <span>LATEST UPDATES</span>
        </div>
        <div className="ticker-wrap">
          <div className="ticker">
            {tickerItems.map((notice, index) => (
              <div key={index} className="ticker__item">
                {notice} <span className="separator">*</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .notice-bar-wrapper {
          width: 100%;
          background: #01228D;
          height: 38px;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 10001;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .notice-bar-container {
          display: flex;
          width: 100%;
          align-items: center;
        }

        .notice-label {
          background: #EAB830;
          color: #01228D;
          padding: 0 15px;
          height: 38px;
          display: flex;
          align-items: center;
          font-weight: 800;
          font-size: 11px;
          letter-spacing: 1px;
          position: relative;
          z-index: 2;
          box-shadow: 5px 0 15px rgba(0,0,0,0.2);
          white-space: nowrap;
        }

        .ticker-wrap {
          flex-grow: 1;
          overflow: hidden;
          padding-left: 20px;
        }

        .ticker {
          display: inline-block;
          white-space: nowrap;
          padding-right: 100%;
          animation: ticker 40s linear infinite;
        }

        .ticker:hover {
          animation-play-state: paused;
        }

        .ticker__item {
          display: inline-block;
          padding: 0 30px;
          font-size: 14px;
          color: #fff;
          font-weight: 500;
        }

        .separator {
          color: #EAB830;
          margin-left: 30px;
          font-weight: 900;
          font-size: 18px;
          vertical-align: middle;
        }

        @keyframes ticker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        @media (max-width: 768px) {
          .notice-label {
            padding: 0 10px;
            font-size: 10px;
          }
          .ticker__item {
            font-size: 12px;
            padding: 0 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default NoticeBar;

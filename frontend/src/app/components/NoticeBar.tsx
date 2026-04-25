"use client";

import React from 'react';
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

import { usePathname } from 'next/navigation';

const NoticeBar = () => {
  const notices = useQuery(api.notices.getAll);
  const pathname = usePathname();

  // Hide on admin and login routes
  if (pathname && (pathname.startsWith('/admin') || pathname.startsWith('/login'))) {
    return null;
  }

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

    </div>
  );
};

export default NoticeBar;

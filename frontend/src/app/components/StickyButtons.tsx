"use client";

import React from 'react';

const StickyButtons = () => {
  return (
    <div className="sticky-buttons-container" style={{
      position: 'fixed',
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '2px'
    }}>
      <a 
        href="#" 
        className="sticky-btn demo-btn" 
        style={{
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          background: '#EAB830',
          color: '#fff',
          padding: '20px 12px',
          borderRadius: '0 5px 5px 0',
          fontWeight: '700',
          fontSize: '13px',
          textDecoration: 'none',
          boxShadow: '2px 2px 10px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '160px',
          letterSpacing: '0.5px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        Book Free Demo Class
      </a>
      <a 
        href="#" 
        className="sticky-btn enroll-btn" 
        style={{
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          background: '#01228D',
          color: '#fff',
          padding: '20px 12px',
          borderRadius: '0 5px 5px 0',
          fontWeight: '700',
          fontSize: '13px',
          textDecoration: 'none',
          boxShadow: '2px 2px 10px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '160px',
          letterSpacing: '0.5px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        Enroll for the Course
      </a>

      <style jsx>{`
        .sticky-btn:hover {
          width: 50px !important;
          padding-left: 20px !important;
        }
        .demo-btn:hover { background: #d4a72a !important; }
        .enroll-btn:hover { background: #0a30ad !important; }
        
        @media (max-width: 768px) {
          .sticky-buttons-container {
            display: none; /* Hide on mobile to avoid covering content */
          }
        }
      `}</style>
    </div>
  );
};

export default StickyButtons;

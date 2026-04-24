"use client";

import React, { useState } from 'react';
import LeadForm from './LeadForm';

import { usePathname } from 'next/navigation';

const StickyButtons = () => {
  const pathname = usePathname();
  const [formConfig, setFormConfig] = useState<{ isOpen: boolean; type: 'demo' | 'enroll' }>({
    isOpen: false,
    type: 'demo'
  });

  // Hide on admin and login routes
  if (pathname && (pathname.startsWith('/admin') || pathname.startsWith('/login'))) {
    return null;
  }

  const openForm = (type: 'demo' | 'enroll') => {
    setFormConfig({ isOpen: true, type });
  };

  const closeForm = () => {
    setFormConfig({ ...formConfig, isOpen: false });
  };

  return (
    <>
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
      <button 
        onClick={() => openForm('demo')}
        className="sticky-btn demo-btn" 
        style={{
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          background: '#EAB830',
          color: '#fff',
          padding: '15px 10px',
          borderRadius: '5px 0 0 5px',
          fontWeight: '700',
          fontSize: '13px',
          textDecoration: 'none',
          boxShadow: '-2px 2px 10px rgba(0,0,0,0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '110px',
          letterSpacing: '0.5px',
          border: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
          right: '-5px',
          cursor: 'pointer'
        }}
      >
        Book Demo
      </button>
      <button 
        onClick={() => openForm('enroll')}
        className="sticky-btn enroll-btn" 
        style={{
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          background: '#01228D',
          color: '#fff',
          padding: '15px 10px',
          borderRadius: '5px 0 0 5px',
          fontWeight: '700',
          fontSize: '13px',
          textDecoration: 'none',
          boxShadow: '-2px 2px 10px rgba(0,0,0,0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '110px',
          letterSpacing: '0.5px',
          border: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
          right: '-5px',
          cursor: 'pointer'
        }}
      >
        Enroll Now
      </button>

    </div>

    <LeadForm 
      isOpen={formConfig.isOpen} 
      onClose={closeForm} 
      type={formConfig.type} 
    />

      <style jsx>{`
        .sticky-btn:hover {
          right: 0px !important;
          box-shadow: -5px 5px 20px rgba(0,0,0,0.2) !important;
        }
        .demo-btn:hover { 
          background: #f5c441 !important; 
        }
        .enroll-btn:hover { 
          background: #0a35c2 !important; 
        }
        
        @media (max-width: 768px) {
          .sticky-buttons-container {
            display: none; /* Hide on mobile to avoid covering content */
          }
        }
      `}</style>
    </>
  );
};

export default StickyButtons;

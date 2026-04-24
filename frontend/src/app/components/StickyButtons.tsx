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
    <div className="sticky-buttons-container">
      <button 
        onClick={() => openForm('demo')}
        className="sticky-btn demo-btn" 
      >
        Book Demo
      </button>
      <button 
        onClick={() => openForm('enroll')}
        className="sticky-btn enroll-btn" 
      >
        Enroll Now
      </button>

    </div>

    <LeadForm 
      isOpen={formConfig.isOpen} 
      onClose={closeForm} 
      type={formConfig.type} 
    />


    </>
  );
};

export default StickyButtons;

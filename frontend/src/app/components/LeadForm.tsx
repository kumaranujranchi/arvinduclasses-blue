"use client";

import React, { useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'demo' | 'enroll';
}

const LeadForm = ({ isOpen, onClose, type }: LeadFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    locality: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const createLead = useMutation(api.leads.createLead);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting lead form:", { ...formData, type });
    setStatus('submitting');
    try {
      const result = await createLead({
        ...formData,
        type: type
      });
      console.log("Lead created successfully:", result);
      setStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', phone: '', course: '', locality: '' });
        setStatus('idle');
      }, 2000);
    } catch (error) {
      console.error("Lead submission error:", error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Scroll lock effect (Mobile only)
  React.useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className={`lead-form-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="lead-form-container" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h3>{type === 'demo' ? 'Book a Free Demo' : 'Enroll Now'}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        {status === 'error' && (
          <div className="error-notice">
            Something went wrong. Please try again or call us directly.
          </div>
        )}

        {status === 'success' ? (
          <div className="success-message">
            <div className="icon">✓</div>
            <h4>Thank You!</h4>
            <p>Your request has been received. Our team will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" required placeholder="Enter your full name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>WhatsApp Number</label>
                  <input type="tel" name="phone" required placeholder="10-digit number" value={formData.phone} onChange={handleChange} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" required placeholder="yourname@gmail.com" value={formData.email} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Select Course</label>
              <select name="course" required value={formData.course} onChange={handleChange}>
                <option value="">Choose a Program</option>
                <option value="Foundation (6-8)">Foundation (6-8)</option>
                <option value="Science (9-10)">Science (9-10)</option>
                <option value="Commerce (11-12)">Commerce (11-12)</option>
                <option value="Applied Maths (9-12)">Applied Maths (9-12)</option>
                <option value="PCB Program">PCB Program</option>
                <option value="B.Com Support">B.Com Support</option>
              </select>
            </div>
            <div className="form-group">
              <label>Locality / Pin Code</label>
              <input type="text" name="locality" required placeholder="Enter area name or pin code" value={formData.locality} onChange={handleChange} />
            </div>
            <button type="submit" className="submit-btn" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending...' : (type === 'demo' ? 'Submit Demo Request' : 'Enroll Now')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LeadForm;

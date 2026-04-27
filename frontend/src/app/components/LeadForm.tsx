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

      <style jsx>{`
        .lead-form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          z-index: 1000000;
          display: flex;
          justify-content: center;
          align-items: center;
          visibility: hidden;
          opacity: 0;
          transition: all 0.4s ease;
          padding: 20px;
          overflow-y: auto;
        }

        .lead-form-overlay.open {
          visibility: visible;
          opacity: 1;
        }

        .lead-form-container {
          width: 100%;
          max-width: 500px;
          background: #fff;
          border-radius: 24px;
          padding: 40px;
          transform: translateY(40px);
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          position: relative;
          margin: auto;
        }

        .lead-form-overlay.open .lead-form-container {
          transform: translateY(0);
        }

        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .form-header h3 {
          font-size: 24px;
          color: #01228D;
          font-weight: 800;
        }

        .close-btn {
          background: #f0f2f5;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .close-btn:hover {
          background: #e4e6e9;
          transform: rotate(90deg);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #666;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        input, select {
          width: 100%;
          height: 54px;
          padding: 0 15px;
          border: 2px solid #edf2f7;
          border-radius: 14px;
          font-size: 16px;
          transition: all 0.3s;
        }

        input:focus, select:focus {
          border-color: #01228D;
          outline: none;
          background: #f8fbff;
          box-shadow: 0 0 0 4px rgba(1, 34, 141, 0.1);
        }

        .submit-btn {
          width: 100%;
          height: 60px;
          background: #01228D;
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 10px;
          transition: all 0.3s;
          box-shadow: 0 10px 20px rgba(1, 34, 141, 0.2);
        }

        .submit-btn:hover {
          background: #0a35c2;
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(1, 34, 141, 0.3);
        }

        .submit-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .error-notice {
          background: #fff5f5;
          color: #e53e3e;
          padding: 12px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          border: 1px solid #fed7d7;
        }

        .success-message {
          text-align: center;
          padding: 40px 0;
        }

        .success-message .icon {
          width: 80px;
          height: 80px;
          background: #0C8B51;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          margin: 0 auto 20px;
          box-shadow: 0 10px 20px rgba(12, 139, 81, 0.2);
        }

        .success-message h4 {
          font-size: 26px;
          color: #01228D;
          margin-bottom: 15px;
          font-weight: 800;
        }

        .success-message p {
          color: #666;
          font-size: 18px;
          line-height: 1.6;
        }

        @media (max-width: 576px) {
          .lead-form-overlay {
            padding: 15px;
            align-items: flex-start; /* Start from top if content is long */
          }
          .lead-form-container {
            padding: 25px 20px;
            border-radius: 20px;
            margin-top: 20px;
          }
          .form-header h3 {
            font-size: 20px;
          }
          input, select {
            height: 48px;
            font-size: 14px;
          }
          .submit-btn {
            height: 52px;
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default LeadForm;

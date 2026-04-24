"use client";

import React from 'react';

const FeatureScrolling = () => {
  const row1 = [
    { label: "Live Classes", icon: "fa-video", color: "#3182ce" },
    { label: "24x7 Doubt Solving", icon: "fa-headset", color: "#38a169" },
    { label: "Mock Tests", icon: "fa-file-alt", color: "#dd6b20" },
    { label: "Flashcards", icon: "fa-bolt", color: "#805ad5" },
    { label: "Career Guidance", icon: "fa-compass", color: "#d69e2e" },
    { label: "Live Classes", icon: "fa-video", color: "#3182ce" },
    { label: "24x7 Doubt Solving", icon: "fa-headset", color: "#38a169" },
    { label: "Mock Tests", icon: "fa-file-alt", color: "#dd6b20" },
    { label: "Flashcards", icon: "fa-bolt", color: "#805ad5" },
    { label: "Career Guidance", icon: "fa-compass", color: "#d69e2e" }
  ];

  const row2 = [
    { label: "Improvement Book", icon: "fa-star", color: "#3182ce" },
    { label: "PYQ Practice", icon: "fa-history", color: "#38a169" },
    { label: "Meditation Session", icon: "fa-peace", color: "#e53e3e" },
    { label: "Revision Notes", icon: "fa-sticky-note", color: "#805ad5" },
    { label: "PYQ Tests", icon: "fa-file-signature", color: "#d69e2e" },
    { label: "Mentorship", icon: "fa-user-graduate", color: "#3182ce" },
    { label: "Improvement Book", icon: "fa-star", color: "#3182ce" },
    { label: "PYQ Practice", icon: "fa-history", color: "#38a169" },
    { label: "Meditation Session", icon: "fa-peace", color: "#e53e3e" },
    { label: "Revision Notes", icon: "fa-sticky-note", color: "#805ad5" },
    { label: "PYQ Tests", icon: "fa-file-signature", color: "#d69e2e" },
    { label: "Mentorship", icon: "fa-user-graduate", color: "#3182ce" }
  ];

  const row3 = [
    { label: "Topic-wise Videos", icon: "fa-play-circle", color: "#e53e3e" },
    { label: "Subjective Tests", icon: "fa-pen-fancy", color: "#3182ce" },
    { label: "ALLEN Important Q's", icon: "fa-brain", color: "#38a169" },
    { label: "Topic-wise Tests", icon: "fa-bullseye", color: "#dd6b20" },
    { label: "Regular Homework", icon: "fa-home", color: "#805ad5" },
    { label: "Topic-wise Videos", icon: "fa-play-circle", color: "#e53e3e" },
    { label: "Subjective Tests", icon: "fa-pen-fancy", color: "#3182ce" },
    { label: "ALLEN Important Q's", icon: "fa-brain", color: "#38a169" },
    { label: "Topic-wise Tests", icon: "fa-bullseye", color: "#dd6b20" },
    { label: "Regular Homework", icon: "fa-home", color: "#805ad5" }
  ];

  return (
    <section className="feature-scrolling-area">
      <div className="container-fluid p-0 overflow-hidden">
        <div className="scrolling-wrapper">
          {/* Row 1: Left to Right */}
          <div className="scroll-row left-to-right">
            <div className="scroll-content">
              {row1.map((item, i) => (
                <div key={i} className="feature-badge">
                  <div className="icon-box" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
              {row1.map((item, i) => (
                <div key={`dup-${i}`} className="feature-badge">
                  <div className="icon-box" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right to Left */}
          <div className="scroll-row right-to-left">
            <div className="scroll-content">
              {row2.map((item, i) => (
                <div key={i} className="feature-badge">
                  <div className="icon-box" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
              {row2.map((item, i) => (
                <div key={`dup-${i}`} className="feature-badge">
                  <div className="icon-box" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Left to Right */}
          <div className="scroll-row left-to-right">
            <div className="scroll-content">
              {row3.map((item, i) => (
                <div key={i} className="feature-badge">
                  <div className="icon-box" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
              {row3.map((item, i) => (
                <div key={`dup-${i}`} className="feature-badge">
                  <div className="icon-box" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Masks */}
          <div className="gradient-mask mask-left"></div>
          <div className="gradient-mask mask-right"></div>
        </div>
      </div>

      <style jsx>{`
        .feature-scrolling-area {
          padding: 60px 0;
          background: #f8fbff;
          position: relative;
        }

        .scrolling-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .scroll-row {
          width: 100%;
          overflow: hidden;
          display: flex;
          white-space: nowrap;
        }

        .scroll-content {
          display: flex;
          gap: 20px;
          padding: 10px 0;
        }

        .left-to-right .scroll-content {
          animation: scroll-left 40s linear infinite;
        }

        .right-to-left .scroll-content {
          animation: scroll-right 40s linear infinite;
        }

        .feature-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fff;
          padding: 8px 24px;
          border-radius: 100px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.03);
          transition: transform 0.3s ease;
        }

        .feature-badge:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        }

        .icon-box {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 14px;
        }

        .feature-badge span {
          font-size: 15px;
          font-weight: 600;
          color: #333;
        }

        .gradient-mask {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 150px;
          pointer-events: none;
          z-index: 10;
        }

        .mask-left {
          left: 0;
          background: linear-gradient(to right, #f8fbff 0%, transparent 100%);
        }

        .mask-right {
          right: 0;
          background: linear-gradient(to left, #f8fbff 0%, transparent 100%);
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        @media (max-width: 768px) {
          .feature-scrolling-area {
            padding: 40px 0;
          }
          .gradient-mask {
            width: 80px;
          }
          .feature-badge {
            padding: 6px 18px;
          }
          .feature-badge span {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
};

export default FeatureScrolling;

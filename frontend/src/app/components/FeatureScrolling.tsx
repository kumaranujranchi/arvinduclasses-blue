"use client";

import React from 'react';

const FeatureScrolling = () => {
  const colors = ["#3182ce", "#38a169", "#dd6b20", "#805ad5", "#e53e3e", "#d69e2e"];
  const icons = ["fa-check-circle", "fa-star", "fa-book", "fa-graduation-cap", "fa-chalkboard-teacher", "fa-pencil-alt", "fa-lightbulb", "fa-user-check", "fa-clipboard-list", "fa-chart-line"];

  const getTopicObj = (label: string, index: number) => ({
    label,
    icon: icons[index % icons.length],
    color: colors[index % colors.length]
  });

  const allTopics = [
    "Live Classes", "Concept-Based Learning", "Small Batch Size", "Personal Attention", "Doubt Solving Sessions", 
    "Regular Homework", "Topic-wise Practice", "Weekly Tests", "Chapter-wise Tests", "Full Syllabus Tests", 
    "Performance Tracking", "Progress Reports", "Exam Preparation", "Answer Writing Practice", "Revision Sessions", 
    "Study Planning", "Time Management Support", "Individual Guidance", "Parent Updates", "Weak Topic Improvement", 
    "Maths Problem Practice", "Science Concept Clarity", "Physics Numericals", "Chemistry Reactions Practice", 
    "Biology Diagrams & Theory", "Accountancy Numericals", "Economics Concepts", "Business Studies Case Practice", 
    "Board Exam Strategy", "Previous Year Questions Practice", "Sample Paper Practice", "Test Analysis & Feedback", 
    "Speed & Accuracy Improvement", "Concept Revision Classes", "Daily Practice Questions", "Structured Curriculum", 
    "Experienced Faculty", "Result-Oriented Approach", "Focused Learning Environment", "Limited Batch Size", 
    "Regular Attendance Monitoring", "Student Performance Review", "Doubt Clearing Classes", "Practice Worksheets", 
    "Formula Revision", "Diagram Practice", "Writing Skills Improvement", "Exam Time Strategy", 
    "Stress-Free Learning Environment", "Continuous Assessment", "Strong Academic Foundation", "Confidence Building", 
    "Smart Study Techniques"
  ];

  const row1 = allTopics.slice(0, 18).map((t, i) => getTopicObj(t, i));
  const row2 = allTopics.slice(18, 36).map((t, i) => getTopicObj(t, i + 18));
  const row3 = allTopics.slice(36).map((t, i) => getTopicObj(t, i + 36));

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
          animation: scroll-left 60s linear infinite;
        }

        .right-to-left .scroll-content {
          animation: scroll-right 60s linear infinite;
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
          background: linear-gradient(to right, #f8fbff 10%, transparent 100%);
        }

        .mask-right {
          right: 0;
          background: linear-gradient(to left, #f8fbff 10%, transparent 100%);
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
          .left-to-right .scroll-content, 
          .right-to-left .scroll-content {
            animation-duration: 40s;
          }
        }
      `}</style>
    </section>
  );
};

export default FeatureScrolling;

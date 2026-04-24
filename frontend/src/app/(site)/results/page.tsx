"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function ResultsPage() {
  const [rollNumber, setRollNumber] = useState("");
  const [month, setMonth] = useState("April 2025");
  const [showResult, setShowResult] = useState(false);
  const activeToppers = useQuery(api.toppers.getActiveToppers);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (rollNumber.trim()) {
      setShowResult(true);
      // Scroll to result
      setTimeout(() => {
        const element = document.getElementById("result-display");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const mockData = {
    name: "Aryan Kumar",
    rollNo: rollNumber || "AC-2025-001",
    batch: "JEE (Advanced) - Target 2026",
    testDate: "15th April 2025",
    rank: "4",
    totalStudents: "120",
    subjects: [
      { name: "Physics", marks: 85, total: 100 },
      { name: "Chemistry", marks: 78, total: 100 },
      { name: "Mathematics", marks: 92, total: 100 },
    ],
    total: 255,
    maxTotal: 300,
    percentage: "85%",
  };

  return (
    <>
      <Header />

      {/* ====== Page Banner Start ====== */}
      <section className="page-banner results-page-banner">
        <div className="page-banner-bg bg_cover results-banner-bg">
          <div className="container">
            <div className="banner-content text-center results-banner-content">
              <h2 className="title">Test Results</h2>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Page Banner Ends ====== */}

      {/* ====== Search Section ====== */}
      <section className="results-search-area pt-80 pb-80 results-search-wrapper">
        {/* Subtle Grid Pattern Overlay - Increased Visibility */}
        <div className="results-grid-overlay"></div>

        <div className="container relative-z1">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-50">
                <h2 className="title results-section-title">Check <span className="text-highlight-yellow">Performance</span></h2>
                <span className="line mx-auto results-section-line"></span>
                <p className="mt-20 results-section-desc">Enter your roll number to access your detailed performance report and subject-wise analysis.</p>
              </div>
              
              <div className="search-card p-4 p-md-5 shadow-lg rounded-lg bg-white position-relative mt-minus-20">
                <form onSubmit={handleSearch}>
                  <div className="row align-items-end">
                    <div className="col-md-5 mb-3 mb-md-0">
                      <div className="form-group">
                        <label className="mb-2 font-weight-bold text-dark">Roll Number</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-right-0"><i className="fas fa-id-card text-primary"></i></span>
                          <input
                            type="text"
                            className="form-control p-3 border-left-0 h-55px"
                            placeholder="e.g. AC-2025-001"
                            value={rollNumber}
                            onChange={(e) => setRollNumber(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                      <div className="form-group">
                        <label className="mb-2 font-weight-bold text-dark">Test Session</label>
                        <select 
                          className="form-control p-3 h-55px"
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                        >
                          <option>April 2025 - Monthly Test</option>
                          <option>March 2025 - Monthly Test</option>
                          <option>February 2025 - Major Test</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <button type="submit" className="main-btn w-100 results-search-btn">
                        <i className="fas fa-search me-2"></i> View Report
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Results Display */}
          {showResult && (
            <div id="result-display" className="result-display-area mt-80">
              <div className="row">
                <div className="col-lg-4 mb-4 mb-lg-0">
                  <div className="student-info-card p-4 rounded shadow-sm bg-white h-100 border-top border-primary border-4">
                    <div className="d-flex align-items-center mb-4">
                      <div className="avatar-circle me-3 avatar-circle-style">
                        <i className="fas fa-user-graduate text-primary fs-24px"></i>
                      </div>
                      <div>
                        <h5 className="mb-0">{mockData.name}</h5>
                        <span className="text-muted small">ID: {mockData.rollNo}</span>
                      </div>
                    </div>
                    
                    <div className="info-list">
                      <div className="info-item d-flex justify-content-between mb-3">
                        <span className="text-muted">Batch</span>
                        <span className="font-weight-bold text-end">{mockData.batch}</span>
                      </div>
                      <div className="info-item d-flex justify-content-between mb-3">
                        <span className="text-muted">Test Date</span>
                        <span className="font-weight-bold">{mockData.testDate}</span>
                      </div>
                      <div className="info-item d-flex justify-content-between mb-3">
                        <span className="text-muted">Status</span>
                        <span className="badge bg-success">Qualified</span>
                      </div>
                    </div>

                    <div className="rank-stats mt-4 p-4 rounded text-center rank-stats-box">
                      <span className="d-block small opacity-75 mb-1 text-uppercase">Institute Rank</span>
                      <h2 className="text-white mb-0">{mockData.rank}<small className="opacity-50"> / {mockData.totalStudents}</small></h2>
                      <div className="mt-2 small">Top 5% of the batch</div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-8">
                  <div className="marks-table-card p-4 rounded shadow-sm bg-white h-100">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 className="mb-0">Subject-wise Analysis</h4>
                      <button className="btn btn-outline-primary btn-sm"><i className="fas fa-download me-2"></i> Download PDF</button>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead className="bg-light">
                          <tr>
                            <th className="border-0">Subject</th>
                            <th className="border-0">Marks</th>
                            <th className="border-0">Percentage</th>
                            <th className="border-0">Strength</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockData.subjects.map((sub, i) => (
                            <tr key={i}>
                              <td className="font-weight-bold py-3">{sub.name}</td>
                              <td>{sub.marks} <span className="text-muted">/ {sub.total}</span></td>
                              <td>{((sub.marks / sub.total) * 100).toFixed(0)}%</td>
                              <td className="min-w-150px">
                                <div className="progress h-6px">
                                  <div 
                                    className="progress-bar" 
                                    style={{ 
                                      width: `${(sub.marks / sub.total) * 100}%`,
                                      backgroundColor: sub.marks > 85 ? "#38a169" : sub.marks > 70 ? "#d69e2e" : "#e53e3e"
                                    }}
                                  ></div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="summary-pills d-flex flex-wrap gap-3 mt-4">
                      <div className="pill p-3 rounded flex-grow-1 pill-success">
                        <div className="text-success small font-weight-bold">Total Percentage</div>
                        <h4 className="text-success mb-0">{mockData.percentage}</h4>
                      </div>
                      <div className="pill p-3 rounded flex-grow-1 pill-primary">
                        <div className="text-primary small font-weight-bold">Total Marks</div>
                        <h4 className="text-primary mb-0">{mockData.total} <small className="text-muted fs-14px">/ {mockData.maxTotal}</small></h4>
                      </div>
                    </div>

                    <div className="remark-box mt-4 p-3 rounded remark-box-style">
                      <h6 className="mb-2 text-dark font-weight-bold"><i className="fas fa-lightbulb text-warning me-2"></i> Performance Insight</h6>
                      <p className="m-0 text-muted small line-height-16">
                        Aryan is showing steady improvement in Mathematics. However, attention is required in Chemistry specifically in Organic reactions. 
                        We recommend attending the upcoming doubt-solving session on 20th April.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ====== Consistency Performers (Toppers) Section ====== */}
      <section className="toppers-area pt-100 pb-100 toppers-area-wrapper">
        {/* Subtle Grid Pattern Overlay - Increased Visibility */}
        <div className="results-grid-overlay opacity-50"></div>

        <div className="container relative-z1">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-50">
                <h2 className="title results-section-title">Our Consistent <span className="text-highlight-yellow">Performers</span></h2>
                <span className="line mx-auto results-section-line"></span>
                <p className="mt-20 results-section-desc">Celebrating the hard work and dedication of our top rankers in recent monthly assessments.</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {activeToppers === undefined ? (
               <div className="col-12 text-center py-5">
                 <div className="spinner-border text-primary" role="status"></div>
               </div>
            ) : activeToppers.length > 0 ? activeToppers.map((topper, i) => (
              <div key={topper._id} className="col-lg-4 col-md-6 mb-30">
                <div className="single-topper text-center p-4 border rounded-lg transition-all topper-card-bg">
                  <div className="topper-rank-badge">
                    #{topper.rank}
                  </div>
                  <div className="topper-thumb mb-20">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${topper.name}&background=07294d&color=fff&bold=true`} 
                      alt={topper.name}
                      className="topper-thumb-style"
                    />
                  </div>
                  <h4 className="name">{topper.name}</h4>
                  <p className="stream text-muted small mb-3">{topper.stream} | {topper.testMonth}</p>
                  <div className="score font-weight-bold text-primary fs-20px">{topper.score}</div>
                </div>
              </div>
            )) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted">No toppers listed for this session yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====== Upcoming Tests Section ====== */}
      <section className="upcoming-tests-area pt-100 pb-100 results-section-wrapper bg-light-gray">
        {/* Subtle Grid Pattern Overlay - Increased Visibility */}
        <div className="results-grid-overlay"></div>

        <div className="container relative-z1">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="mb-40">
                <h2 className="title results-section-title">Upcoming <span className="text-highlight-yellow">Tests</span></h2>
                <span className="line results-section-line"></span>
                <p className="mt-20 results-section-desc line-height-16">Stay prepared for your next challenge. Regular testing helps in identifying weak spots and building exam confidence.</p>
              </div>
              <div className="test-calendar-list">
                {[
                  { date: "May 05, 2025", title: "JEE Mains Mock Test - 4", type: "Science" },
                  { date: "May 12, 2025", title: "B.Com Semester Review", type: "Commerce" },
                  { date: "May 20, 2025", title: "Monthly Foundation Test", type: "Class 10" }
                ].map((test, i) => (
                  <div key={i} className="test-item d-flex align-items-center p-3 mb-3 bg-white rounded shadow-sm">
                    <div className="date-box text-center p-2 rounded date-box-style">
                      <span className="d-block font-weight-bold text-primary">{test.date.split(',')[0]}</span>
                    </div>
                    <div className="test-info ms-4 flex-grow-1">
                      <h6 className="mb-1 font-weight-bold text-dark">{test.title}</h6>
                      <span className="badge bg-light text-muted border">{test.type}</span>
                    </div>
                    <i className="fas fa-chevron-right text-light"></i>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="test-cta p-5 rounded-lg text-white test-cta-box">
                <h3 className="text-white mb-3">Improve Your Result</h3>
                <p className="text-white opacity-75 mb-30">Get personalized mentoring and focus on your weak areas with our expert faculty members.</p>
                <Link href="/courses" className="main-btn main-btn-2 btn-join-mentorship">Join Mentorship</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FAQ Section ====== */}
      <section className="results-faq pt-100 pb-100 results-section-wrapper">
        {/* Subtle Grid Pattern Overlay - Increased Visibility */}
        <div className="results-grid-overlay opacity-50"></div>

        <div className="container relative-z1">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-50">
                <h2 className="title results-section-title">Frequently <span className="text-highlight-yellow">Asked</span> Questions</h2>
                <span className="line mx-auto results-section-line"></span>
              </div>
              <div className="faq-wrapper">
                <div className="faq-item p-3 mb-3 border rounded bg-white shadow-sm">
                  <h6 className="mb-2 font-weight-bold"><i className="fas fa-question-circle text-primary me-2"></i> How often are results updated?</h6>
                  <p className="text-muted small">Test results are typically uploaded within 48-72 hours of the test completion after thorough evaluation by our subject experts.</p>
                </div>
                <div className="faq-item p-3 mb-3 border rounded bg-white shadow-sm">
                  <h6 className="mb-2 font-weight-bold"><i className="fas fa-question-circle text-primary me-2"></i> What should I do if I cannot find my result?</h6>
                  <p className="text-muted small">Please ensure you are entering the correct roll number. If the problem persists, contact the institute office or your batch coordinator.</p>
                </div>
                <div className="faq-item p-3 mb-3 border rounded bg-white shadow-sm">
                  <h6 className="mb-2 font-weight-bold"><i className="fas fa-question-circle text-primary me-2"></i> Are these results shared with parents?</h6>
                  <p className="text-muted small">Yes, an automated SMS/WhatsApp notification is sent to registered parents once the results are published on the website.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

    </>
  );
}

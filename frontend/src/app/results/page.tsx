"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

export default function ResultsPage() {
  const [rollNumber, setRollNumber] = useState("");
  const [month, setMonth] = useState("April 2025");
  const [showResult, setShowResult] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (rollNumber.trim()) {
      setShowResult(true);
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
      <section className="page-banner">
        <div
          className="page-banner-bg bg_cover"
          style={{ backgroundColor: "#07294d", paddingTop: "120px", paddingBottom: "60px" }}
        >
          <div className="container">
            <div className="banner-content text-center">
              <h2 className="title text-white">Monthly Test Results</h2>
              <p className="text-white mt-2">Track your child's academic progress every month</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Search Section ====== */}
      <section className="results-search-area pt-80 pb-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="search-card p-5 shadow-lg rounded bg-white">
                <form onSubmit={handleSearch}>
                  <div className="row">
                    <div className="col-md-5">
                      <div className="form-group mb-3">
                        <label className="mb-2 font-weight-bold">Student Roll Number</label>
                        <input
                          type="text"
                          className="form-control p-3"
                          placeholder="e.g. AC-2025-001"
                          value={rollNumber}
                          onChange={(e) => setRollNumber(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3">
                        <label className="mb-2 font-weight-bold">Select Month</label>
                        <select 
                          className="form-control p-3"
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                        >
                          <option>April 2025</option>
                          <option>March 2025</option>
                          <option>February 2025</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3 d-flex align-items-end">
                      <button type="submit" className="main-btn w-100 mb-3" style={{ height: "58px", borderRadius: "8px" }}>
                        View Result
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Results Display */}
          {showResult && (
            <div className="result-display-area mt-80 wow fadeInUp">
              <div className="row">
                <div className="col-lg-4">
                  <div className="student-info-card p-4 rounded shadow-sm bg-white border-top border-primary border-4">
                    <h4 className="mb-4">Student Profile</h4>
                    <div className="info-item mb-3">
                      <span className="text-muted d-block small">Name</span>
                      <span className="font-weight-bold">{mockData.name}</span>
                    </div>
                    <div className="info-item mb-3">
                      <span className="text-muted d-block small">Roll Number</span>
                      <span className="font-weight-bold">{mockData.rollNo}</span>
                    </div>
                    <div className="info-item mb-3">
                      <span className="text-muted d-block small">Batch</span>
                      <span className="font-weight-bold">{mockData.batch}</span>
                    </div>
                    <div className="info-item mb-3">
                      <span className="text-muted d-block small">Test Date</span>
                      <span className="font-weight-bold">{mockData.testDate}</span>
                    </div>
                    <hr />
                    <div className="rank-badge text-center p-3 rounded" style={{ backgroundColor: "#f0f7ff" }}>
                      <span className="d-block text-primary small font-weight-bold">INSTITUTE RANK</span>
                      <h2 className="text-primary m-0">{mockData.rank}<small className="text-muted"> / {mockData.totalStudents}</small></h2>
                    </div>
                  </div>
                </div>

                <div className="col-lg-8">
                  <div className="marks-table-card p-4 rounded shadow-sm bg-white">
                    <h4 className="mb-4">Score Breakdown</h4>
                    <div className="table-responsive">
                      <table className="table">
                        <thead className="thead-light">
                          <tr>
                            <th>Subject</th>
                            <th>Marks Obtained</th>
                            <th>Max Marks</th>
                            <th>Performance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockData.subjects.map((sub, i) => (
                            <tr key={i}>
                              <td className="font-weight-bold">{sub.name}</td>
                              <td>{sub.marks}</td>
                              <td>{sub.total}</td>
                              <td style={{ width: "200px" }}>
                                <div className="progress" style={{ height: "8px" }}>
                                  <div 
                                    className="progress-bar" 
                                    style={{ 
                                      width: `${(sub.marks / sub.total) * 100}%`,
                                      backgroundColor: sub.marks > 80 ? "#38a169" : "#d69e2e"
                                    }}
                                  ></div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-light">
                            <td className="font-weight-bold">TOTAL</td>
                            <td className="font-weight-bold text-primary">{mockData.total}</td>
                            <td className="font-weight-bold">{mockData.maxTotal}</td>
                            <td className="font-weight-bold text-primary">{mockData.percentage}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    <div className="remark-box mt-4 p-3 rounded" style={{ borderLeft: "4px solid #ffc600", backgroundColor: "#fffdf5" }}>
                      <h6 className="mb-2"><i className="fas fa-info-circle me-2"></i> Educator's Remark</h6>
                      <p className="m-0 text-muted italic">Excellent performance in Mathematics. Needs slight focus on organic chemistry concepts. Keep up the good work!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .search-card {
          margin-top: -60px;
          z-index: 10;
          position: relative;
        }
        .info-item span {
          color: #333;
        }
        .table thead th {
          border-top: none;
          background: #f8fbff;
          color: #07294d;
        }
        .rank-badge h2 small {
          font-size: 16px;
        }
        .main-btn {
          background-color: #ffc600;
          color: #07294d;
          border: none;
          font-weight: 700;
          transition: all 0.3s;
        }
        .main-btn:hover {
          background-color: #07294d;
          color: #fff;
        }
        .form-control:focus {
          border-color: #ffc600;
          box-shadow: 0 0 0 0.2rem rgba(255, 198, 0, 0.25);
        }
      `}</style>
    </>
  );
}

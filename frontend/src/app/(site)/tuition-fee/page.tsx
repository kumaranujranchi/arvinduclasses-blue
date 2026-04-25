"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";

export default function TuitionFeePage() {
  const [user, setUser] = useState<any>(null);
  const [identifier, setIdentifier] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if user is already logged in
  useEffect(() => {
    const session = localStorage.getItem("user_session");
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  // Fetch logged in user's fee data
  const studentFeeData = useQuery(api.fees.getStudentFee, 
    user ? { studentId: user.id } : "skip" as any
  );

  const handlePublicCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSearchResult(null);

    // In a real app, this would be a mutation or a conditional query
    // For now we'll simulate the search by calling the query logic
    // Since we can't call useQuery conditionally easily in a handler, 
    // we would usually use a custom action or just use the query hook above
    // but here we'll just show the UI state.
    
    // Note: In production, we'd use useAction or similar for this.
    setLoading(false);
    setError("Please login to see detailed real-time balance or contact admin.");
  };

  return (
    <>
      <Header />

      {/* ====== Page Banner Start ====== */}
      <section className="page-banner">
        <div className="page-banner-bg bg_cover" style={{ backgroundImage: "url(/assets/images/course-banner.png)", backgroundColor: "#01228D" }}>
          <div className="container">
            <div className="banner-content text-center pt-80 pb-80">
              <h2 className="title text-white">Tuition Fee & Payments</h2>
              <p className="text-white mt-20">Securely manage your course fees and view payment history.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tuition-fee-area pt-80 pb-100 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            
            {/* If User is Logged In - Show Dashboard */}
            {user ? (
              <div className="col-lg-10">
                <div className="fee-dashboard bg-white p-5 rounded-3xl shadow-xl">
                  <div className="d-flex justify-content-between align-items-center mb-40 flex-wrap gap-3">
                    <div>
                      <h3 className="mb-10" style={{ color: '#01228D', fontWeight: '800' }}>Welcome, {user.name}</h3>
                      <p className="text-muted">Student ID: {user.id.substring(0, 8)}...</p>
                    </div>
                    <div className={`status-badge px-4 py-2 rounded-full font-bold ${
                      studentFeeData?.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      Status: {studentFeeData?.status || 'Active'}
                    </div>
                  </div>

                  <div className="row g-4 mb-50">
                    <div className="col-md-4">
                      <div className="fee-stat-card p-4 rounded-2xl bg-blue-50 border border-blue-100 h-100">
                        <span className="text-blue-600 font-bold uppercase text-xs">Total Course Fee</span>
                        <h2 className="mt-10 font-extrabold" style={{ color: '#01228D' }}>₹{studentFeeData?.totalFee?.toLocaleString() || '---'}</h2>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="fee-stat-card p-4 rounded-2xl bg-green-50 border border-green-100 h-100">
                        <span className="text-green-600 font-bold uppercase text-xs">Amount Paid</span>
                        <h2 className="mt-10 font-extrabold text-green-700">₹{studentFeeData?.paidAmount?.toLocaleString() || '0'}</h2>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="fee-stat-card p-4 rounded-2xl bg-orange-50 border border-orange-100 h-100">
                        <span className="text-orange-600 font-bold uppercase text-xs">Balance Due</span>
                        <h2 className="mt-10 font-extrabold text-orange-700">
                          ₹{studentFeeData ? (studentFeeData.totalFee - studentFeeData.paidAmount - (studentFeeData.discount || 0)).toLocaleString() : '---'}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div className="payment-action-box p-5 rounded-2xl border-2 border-dashed border-gray-200 text-center mb-50">
                    <h4 className="mb-20" style={{ fontWeight: '700' }}>Quick Online Payment</h4>
                    <p className="text-muted mb-30">You can pay your remaining balance securely using UPI, Card, or Net Banking.</p>
                    <button className="main-btn !bg-gray-400 !border-gray-400 cursor-not-allowed" disabled>
                      Online Payment Coming Soon
                    </button>
                    <p className="mt-15 text-xs text-muted">Online payment gateway is currently under integration. Please pay at the office for now.</p>
                  </div>

                  {/* Payment History */}
                  <div className="payment-history mt-40">
                    <h4 className="mb-25" style={{ fontWeight: '700', color: '#01228D' }}>Recent Transactions</h4>
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Date</th>
                            <th>Method</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentFeeData?.paymentHistory && studentFeeData.paymentHistory.length > 0 ? (
                            studentFeeData.paymentHistory.map((p: any) => (
                              <tr key={p._id}>
                                <td>{new Date(p.paidAt).toLocaleDateString()}</td>
                                <td>{p.paymentMethod}</td>
                                <td>{p.transactionId || '---'}</td>
                                <td className="font-bold">₹{p.amount.toLocaleString()}</td>
                                <td>
                                  <span className={`badge ${p.status === 'success' ? 'bg-success' : 'bg-warning'}`}>
                                    {p.status}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="text-center py-4 text-muted">No transactions found.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* If Not Logged In - Show Search / Login Promo */
              <div className="col-lg-6">
                <div className="search-balance bg-white p-5 rounded-3xl shadow-xl">
                  <div className="text-center mb-40">
                    <div className="icon-box mb-20 text-blue-600">
                      <i className="fas fa-wallet fa-3x"></i>
                    </div>
                    <h3 style={{ color: '#01228D', fontWeight: '800' }}>Check Your Balance</h3>
                    <p className="text-muted">Enter your registered Phone Number or Email to view your current fee status.</p>
                  </div>

                  <form onSubmit={handlePublicCheck}>
                    <div className="mb-30">
                      <input 
                        type="text" 
                        className="form-control p-4 rounded-xl border-2 focus:border-blue-600" 
                        placeholder="Phone Number or Email"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="main-btn w-full !block" disabled={loading}>
                      {loading ? 'Searching...' : 'Check Balance Now'}
                    </button>
                    {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
                  </form>

                  <div className="mt-40 pt-40 border-t text-center">
                    <p className="mb-20">Are you a regular student?</p>
                    <Link href="/login" className="text-blue-600 font-bold hover:underline">
                      Login to your account for full history <i className="fas fa-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>

                <div className="mt-40 p-4 rounded-2xl bg-yellow-50 border border-yellow-200 d-flex gap-3 align-items-center">
                  <i className="fas fa-info-circle text-yellow-600"></i>
                  <p className="text-sm text-yellow-800">
                    If you cannot find your details, please visit the administration office with your enrollment receipt.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      <section className="fee-policy pb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="policy-box p-5 rounded-3xl bg-white shadow-sm border border-gray-100">
                <h4 className="mb-30" style={{ color: '#01228D', fontWeight: '700' }}>Fee Payment Policy</h4>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="policy-item d-flex gap-3">
                      <div className="num-circle bg-blue-100 text-blue-700 rounded-full d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px', minWidth: '30px' }}>1</div>
                      <p className="text-sm">Fees must be paid on or before the 10th of every installment month to avoid late charges.</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="policy-item d-flex gap-3">
                      <div className="num-circle bg-blue-100 text-blue-700 rounded-full d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px', minWidth: '30px' }}>2</div>
                      <p className="text-sm">Always collect your official printed receipt from the office for every offline transaction.</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="policy-item d-flex gap-3">
                      <div className="num-circle bg-blue-100 text-blue-700 rounded-full d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px', minWidth: '30px' }}>3</div>
                      <p className="text-sm">Online transaction convenience charges may apply depending on the payment method selected.</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="policy-item d-flex gap-3">
                      <div className="num-circle bg-blue-100 text-blue-700 rounded-full d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px', minWidth: '30px' }}>4</div>
                      <p className="text-sm">Scholarship discounts are applied at the time of admission and cannot be modified later.</p>
                    </div>
                  </div>
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

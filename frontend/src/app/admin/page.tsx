"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const stats = useQuery(api.courses.getDashboardStats);
  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    const sessionStr = localStorage.getItem("user_session");
    if (sessionStr) {
      try {
        const user = JSON.parse(sessionStr);
        setUserName(user.name.split(" ")[0]);
      } catch (e) {}
    }
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#01228D] border-r-transparent"></div>
      </div>
    );
  }

  const statCards = [
    { label: "Total Leads", value: stats.totalLeads, icon: "fas fa-users", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "New Admissions", value: stats.newLeads, icon: "fas fa-graduation-cap", color: "text-green-600", bg: "bg-green-50" },
    { label: "Active Courses", value: stats.totalCourses, icon: "fas fa-book", color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Total Toppers", value: stats.totalToppers, icon: "fas fa-award", color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1600px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* Top Section: Welcome Card & Main Stat */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '32px' }} className="xl-grid-3">
        <style>{`
          @media (min-width: 1200px) {
            .xl-grid-3 { grid-template-columns: 2fr 1fr !important; }
          }
          .dashboard-card {
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .dashboard-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          }
        `}</style>
        
        {/* Welcome Card */}
        <div style={{ 
          backgroundColor: '#01228D', 
          borderRadius: '32px', 
          padding: '40px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          overflow: 'hidden', 
          position: 'relative',
          boxShadow: '0 20px 40px rgba(1, 34, 141, 0.2)'
        }}>
          <div style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '60%' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', margin: 0 }}>Welcome Back, {userName}!</h1>
            <p style={{ color: '#bfdbfe', marginTop: '16px', fontSize: '18px', lineHeight: '1.6' }}>
              You have {stats.newLeads} new admissions this month. Keep up the great work!
            </p>
            <div style={{ marginTop: '40px', display: 'flex', gap: '40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '32px', fontWeight: '900' }}>{stats.totalLeads}</span>
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '8px' }}>Total Inquiries</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '40px' }}>
                <span style={{ fontSize: '32px', fontWeight: '900' }}>{stats.newLeads}</span>
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '8px' }}>New Admits</span>
              </div>
            </div>
            <button style={{ 
              marginTop: '40px', 
              padding: '12px 32px', 
              backgroundColor: '#fff', 
              color: '#01228D', 
              fontSize: '14px', 
              fontWeight: '700', 
              borderRadius: '16px', 
              border: 'none', 
              cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}>
              Download Reports
            </button>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '30%', position: 'relative' }}>
            <img 
              src="https://img.freepik.com/free-vector/analytics-concept-illustration_114360-4416.jpg" 
              alt="Dashboard" 
              style={{ width: '100%', height: 'auto', borderRadius: '24px', filter: 'brightness(1.1) contrast(1.1)' }}
            />
          </div>

          <div style={{ position: 'absolute', top: 0, right: 0, width: '256px', height: '256px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%', transform: 'translate(25%, -25%)', filter: 'blur(60px)' }}></div>
        </div>

        {/* Mini Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {statCards.map((card, i) => (
            <div key={i} className="dashboard-card" style={{ 
              backgroundColor: '#fff', 
              padding: '24px', 
              borderRadius: '28px', 
              border: '1px solid #f1f5f9', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }} className={`${card.bg} ${card.color}`}>
                <i className={card.icon}></i>
              </div>
              <div style={{ marginTop: '24px' }}>
                <h4 style={{ fontSize: '24px', fontWeight: '900', color: '#1e293b', margin: 0 }}>{card.value}</h4>
                <p style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '12px', margin: 0 }}>{card.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Leads Table */}
      <div style={{ backgroundColor: '#fff', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
        <div style={{ padding: '32px 40px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: 0 }}>Recent Inquiries</h3>
            <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500', marginTop: '4px', margin: 0 }}>Latest students who reached out via the website.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '6px', borderRadius: '12px', display: 'flex', border: '1px solid #f1f5f9' }}>
              <button style={{ padding: '8px 20px', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: '700', borderRadius: '8px', border: 'none', color: '#01228D', cursor: 'pointer' }}>New</button>
              <button style={{ padding: '8px 20px', backgroundColor: 'transparent', fontSize: '12px', fontWeight: '700', borderRadius: '8px', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Processed</button>
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '20px 40px', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Student</th>
                <th style={{ padding: '20px 40px', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Interested In</th>
                <th style={{ padding: '20px 40px', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                <th style={{ padding: '20px 40px', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Date</th>
                <th style={{ padding: '20px 40px', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentLeads.length > 0 ? stats.recentLeads.map((lead: any) => (
                <tr key={lead._id} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '24px 40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '14px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#01228D', fontWeight: '800', fontSize: '16px' }}>
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: 0 }}>{lead.name}</p>
                        <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500', marginTop: '4px', margin: 0 }}>{lead.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '24px 40px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>{lead.course}</span>
                  </td>
                  <td style={{ padding: '24px 40px' }}>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      padding: '6px 14px', 
                      borderRadius: '20px', 
                      fontSize: '11px', 
                      fontWeight: '700',
                      backgroundColor: lead.status === 'new' ? '#eff6ff' : '#f0fdf4',
                      color: lead.status === 'new' ? '#2563eb' : '#16a34a'
                    }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: lead.status === 'new' ? '#2563eb' : '#16a34a' }}></span>
                      {lead.status === 'new' ? 'Pending' : 'Completed'}
                    </span>
                  </td>
                  <td style={{ padding: '24px 40px', fontSize: '14px', color: '#64748b', fontWeight: '700' }}>
                    {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </td>
                  <td style={{ padding: '24px 40px', textAlign: 'center' }}>
                    <button style={{ width: '40px', height: '40px', borderRadius: '12px', border: 'none', backgroundColor: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} style={{ padding: '80px 40px', textAlign: 'center', color: '#cbd5e1', fontWeight: '700', fontSize: '18px' }}>No leads found yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div style={{ padding: '24px 40px', backgroundColor: '#f8fafc', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Showing last 5 leads</p>
          <button style={{ padding: '8px 24px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px', fontWeight: '700', color: '#01228D', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>View All Leads</button>
        </div>
      </div>
    </div>
  );
}

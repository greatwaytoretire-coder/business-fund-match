"use client";

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Check, X, Shield, Sliders } from 'lucide-react';

interface Lead {
  id: string;
  businessName?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  fundingAmount?: string;
  monthlyRevenue?: string;
  monthlyRev?: string;
  creditScore?: string;
  credit?: string;
  timeInBusiness?: string;
  timeInBiz?: string;
  businessState?: string;
  matchedProgram?: string;
  matchedSlug?: string;
  adminNotes?: string;
  createdAt?: any;
}

interface Lender {
  id: string;
  name: string;
  minCredit: number;
  minRevenue: number;
  minTimeInBiz: string;
  allocationSlug: string;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 🌟 FEATURE: Delete a Lead from the Dashboard & State
  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("Are you sure you want to permanently delete this lead?")) return;
    
    try {
      const response = await fetch(`/api/leads?id=${leadId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove it from the UI state instantly
        setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
      } else {
        alert("Failed to delete lead from database. Ensure your backend route maps DELETE requests.");
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  // 🌟 UPGRADED FEATURE: Complete Manual Lead Creator with Email Capture
  const handleAddManualLead = async () => {
    const fullName = prompt("Enter Applicant's Full Name:");
    if (!fullName) return;

    const email = prompt("Enter Applicant's Email Address:") || "manual@example.com";
    const monthlyRevenue = prompt("Enter Monthly Revenue (e.g., $50,000+):") || "-";
    const creditScore = prompt("Enter Credit Score (e.g., Excellent (720+)):") || "-";
    const timeInBusiness = prompt("Enter Time In Business (e.g., 2+ years):") || "-";
    const trackMatch = prompt("Enter Best Track Match slug\n(e.g., traditional-commercial-bank, credit-repair-partner, sba-express-program, revenue-growth-capital):") || "traditional-commercial-bank";

    // Break up full name cleanly
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || 'Manual';
    const lastName = nameParts.slice(1).join(' ') || 'Lead';

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          businessName: `${firstName} ${lastName}`, // Ensures name renders instead of "Manual Lead" fallback
          email,
          phone: '555-123-4567',
          monthlyRevenue,
          creditScore,
          timeInBusiness,
          matchedSlug: trackMatch,
          matchedProgram: trackMatch,
          status: 'pending'
        })
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert("Failed to save the manual lead to the database.");
      }
    } catch (error) {
      console.error("Error creating manual lead:", error);
    }
  };

  // --- Lender Management State ---
  const [lenders, setLenders] = useState<Lender[]>([
    { id: '1', name: 'Traditional Commercial Bank', minCredit: 680, minRevenue: 50000, minTimeInBiz: '2+ years', allocationSlug: 'traditional-commercial-bank' },
    { id: '2', name: 'Revenue Based Growth Capital', minCredit: 550, minRevenue: 15000, minTimeInBiz: '6+ months', allocationSlug: 'revenue-based-growth-capital' }
  ]);
  const [isAddingLender, setIsAddingLender] = useState(false);
  const [editingLenderId, setEditingLenderId] = useState<string | null>(null);

  // Lender Form Fields
  const [lenderName, setLenderName] = useState('');
  const [minCredit, setMinCredit] = useState(600);
  const [minRevenue, setMinRevenue] = useState(25000);
  const [minTimeInBiz, setMinTimeInBiz] = useState('1+ years');

  // Stats Counters
  const [totalVisitors] = useState<number>(1240);
  const [completedProfiles, setCompletedProfiles] = useState<number>(18);
  const [clickThroughRate] = useState<string>("27.5%");
  const [conversionRate] = useState<string>("12.8%");

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch('/api/leads');
        if (res.ok) {
          const data = await res.json();
          
          const getSortTime = (dateObj: any) => {
            if (!dateObj) return Date.now() + 100000; 
            if (dateObj._seconds) return dateObj._seconds * 1000;
            if (dateObj.seconds) return dateObj.seconds * 1000;
            
            const parsed = new Date(dateObj).getTime();
            return isNaN(parsed) ? Date.now() + 100000 : parsed;
          };

          const sortedLeads = data.sort((a: any, b: any) => {
            return getSortTime(b.createdAt) - getSortTime(a.createdAt);
          });

          setLeads(sortedLeads);
          if (sortedLeads.length > 0) {
            setCompletedProfiles(sortedLeads.length);
          }
        }
      } catch (error) {
        console.error("Error pulling database records:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  const updateLeadNotes = async (id: string, notes: string) => {
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, adminNotes: notes }),
      });
      setLeads(prev => prev.map(l => l.id === id ? { ...l, adminNotes: notes } : l));
    } catch (error) {
      console.error("Error auto-saving admin notes:", error);
    }
  };

  // --- Lender CRUD Handlers ---
  const handleAddLender = () => {
    if (!lenderName.trim()) return;
    const newLender: Lender = {
      id: Date.now().toString(),
      name: lenderName,
      minCredit,
      minRevenue,
      minTimeInBiz,
      allocationSlug: lenderName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
    setLenders([...lenders, newLender]);
    resetLenderForm();
  };

  const handleStartEdit = (lender: Lender) => {
    setEditingLenderId(lender.id);
    setLenderName(lender.name);
    setMinCredit(lender.minCredit);
    setMinRevenue(lender.minRevenue);
    setMinTimeInBiz(lender.minTimeInBiz);
  };

  const handleSaveEdit = (id: string) => {
    setLenders(lenders.map(l => l.id === id ? {
      ...l,
      name: lenderName,
      minCredit,
      minRevenue,
      minTimeInBiz,
      allocationSlug: lenderName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    } : l));
    resetLenderForm();
  };

  const handleDeleteLender = (id: string) => {
    setLenders(lenders.filter(l => l.id !== id));
  };

  const resetLenderForm = () => {
    setIsAddingLender(false);
    setEditingLenderId(null);
    setLenderName('');
    setMinCredit(600);
    setMinRevenue(25000);
    setMinTimeInBiz('1+ years');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-medium">
        Loading Underwriting Records...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6 md:p-12 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Analytics Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-slate-900">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Visitors</span>
            <div className="text-3xl font-black mt-2 text-slate-800">{totalVisitors}</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-slate-900">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Completed Profiles</span>
            <div className="text-3xl font-black mt-2 text-slate-800">{leads.length || completedProfiles}</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-slate-900">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Click-Through Rate (CTR)</span>
            <div className="text-3xl font-black mt-2 text-blue-600">{clickThroughRate}</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-slate-900">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Conversion Rate</span>
            <div className="text-3xl font-black mt-2 text-green-600">{conversionRate}</div>
          </div>
        </div>

        {/* Lender Program Management Matrix */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-slate-900">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sliders size={20} className="text-blue-600" /> Lender Program Management
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure programmatic criteria targets. The frontend funnel evaluates leads against these metrics instantly.
              </p>
            </div>
            {!isAddingLender && !editingLenderId && (
              <button 
                onClick={() => setIsAddingLender(true)}
                className="inline-flex items-center gap-1.5 bg-blue-600 text-white font-semibold text-xs px-4 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm"
              >
                <Plus size={14} /> Add Program Matrix
              </button>
            )}
          </div>

          {/* Form Expansion Section */}
          {(isAddingLender || editingLenderId) && (
            <div className="p-6 bg-slate-50 border-b border-slate-200 space-y-4">
              <h3 className="font-bold text-sm text-slate-800">
                {editingLenderId ? '⚙️ Edit Allocation Ruleset' : '🚀 Register New Underwriting Route'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Lender Name</label>
                  <input 
                    type="text" 
                    value={lenderName}
                    onChange={(e) => setLenderName(e.target.value)}
                    placeholder="e.g., Merchant Capital Fund"
                    className="w-full text-sm p-2 border border-slate-200 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Min Credit Score</label>
                  <input 
                    type="number" 
                    value={minCredit}
                    onChange={(e) => setMinCredit(parseInt(e.target.value) || 0)}
                    className="w-full text-sm p-2 border border-slate-200 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Min Monthly Revenue ($)</label>
                  <input 
                    type="number" 
                    value={minRevenue}
                    onChange={(e) => setMinRevenue(parseInt(e.target.value) || 0)}
                    className="w-full text-sm p-2 border border-slate-200 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Min Time In Business</label>
                  <select 
                    value={minTimeInBiz}
                    onChange={(e) => setMinTimeInBiz(e.target.value)}
                    className="w-full text-sm p-2 border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="Startup">Startup Allowed</option>
                    <option value="6+ months">6+ Months</option>
                    <option value="1+ years">1+ Years</option>
                    <option value="2+ years">2+ Years</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  onClick={resetLenderForm}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600"
                >
                  <X size={14} /> Cancel
                </button>
                <button 
                  onClick={() => editingLenderId ? handleSaveEdit(editingLenderId) : handleAddLender()}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Check size={14} /> {editingLenderId ? 'Save Rules' : 'Publish Option'}
                </button>
              </div>
            </div>
          )}

          {/* Lenders Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4">Lender Key Option</th>
                  <th className="p-4">Credit Cutoff</th>
                  <th className="p-4">Revenue Floor</th>
                  <th className="p-4">Time Horizon</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lenders.map((lender) => (
                  <tr key={lender.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-bold text-slate-800 flex items-center gap-2">
                      <Shield size={16} className="text-blue-500 shrink-0" />
                      <div>
                        <div>{lender.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono tracking-tight font-normal">{lender.allocationSlug}</div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-600">{lender.minCredit}+</td>
                    <td className="p-4 font-medium text-slate-600">${lender.minRevenue.toLocaleString()}/mo</td>
                    <td className="p-4 font-medium text-slate-600">{lender.minTimeInBiz}</td>
                    <td className="p-4 text-right space-x-1 whitespace-nowrap">
                      <button 
                        onClick={() => handleStartEdit(lender)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDeleteLender(lender.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-time Submissions Leads Management Panel */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-slate-900">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Live Admin Panel</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Review matching calculations, optimize localized funnel metrics, and pass records to partner portals.
              </p>
            </div>
            {/* Right Side Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleAddManualLead}
                className="inline-flex items-center gap-1.5 bg-emerald-600 text-white font-semibold text-xs px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition"
              >
                + Add Manual Lead
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4">Applicant Name / Contact</th>
                  <th className="p-4">Monthly Rev</th>
                  <th className="p-4">Credit Score</th>
                  <th className="p-4">Time in Biz</th>
                  <th className="p-4">Best Track Match</th>
                  <th className="p-4">Notes / Portal Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                      No incoming pre-qualification submissions found.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => {
                    // Pull and sanitize name variants safely
                    const cleanOwnerName = [lead.firstName, lead.lastName].filter(Boolean).join(' ').trim() || lead.fullName || '';
                    
                    let displayPrimaryName = "Pre-Qual Applicant";
                    if (cleanOwnerName) {
                      displayPrimaryName = cleanOwnerName;
                    } else if (lead.businessName && !lead.businessName.startsWith("undefined") && lead.businessName !== "Manual Lead") {
                      displayPrimaryName = lead.businessName.replace("'s Venture", "").trim();
                    }

                    return (
                      <tr key={lead.id} className="hover:bg-slate-50 transition">
                        {/* Name & Contact Info Area */}
                        <td className="p-4">
                          <div className="font-bold text-slate-900 text-base">
                            {displayPrimaryName}
                          </div>
                          <div className="text-xs text-slate-500 font-medium mt-0.5 space-y-0.5">
                            {lead.email && <div className="text-blue-600 underline decoration-slate-300">{lead.email}</div>}
                            {lead.phone && <div className="text-slate-400 font-normal">{lead.phone}</div>}
                            {!lead.email && !lead.phone && <div className="text-slate-400 italic font-normal">No contact provided</div>}
                          </div>
                        </td>

                        <td className="p-4 text-slate-700 font-medium">
                          {lead.monthlyRevenue || lead.monthlyRev || '—'}
                        </td>
                        
                        <td className="p-4 text-slate-700">
                          {lead.creditScore || lead.credit || '—'}
                        </td>
                        
                        <td className="p-4 text-slate-700">
                          {lead.timeInBusiness || lead.timeInBiz || '—'}
                        </td>

                        <td className="p-4">
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide">
                            {(lead.matchedProgram || lead.matchedSlug || 'Unassigned').replace(/-/g, ' ')}
                          </span>
                        </td>

                        <td className="p-4 w-1/4">
                          <textarea
                            defaultValue={lead.adminNotes || ''}
                            onBlur={(e) => updateLeadNotes(lead.id, e.target.value)}
                            placeholder="Type verification notes (auto-saves on click away)..."
                            className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 h-14 resize-none bg-slate-50"
                            rows={2}
                          />
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="mt-2 text-xs font-semibold text-red-500 hover:text-red-700 hover:underline transition block text-right w-full"
                          >
                            Delete Lead
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
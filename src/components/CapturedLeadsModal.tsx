import React, { useState, useEffect } from 'react';
import { X, Download, Users, Phone, Calendar, RefreshCw } from 'lucide-react';
import { leadStore, type CapturedLead } from '../utils/leadStore';

interface CapturedLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CapturedLeadsModal: React.FC<CapturedLeadsModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<CapturedLead[]>([]);

  const refreshLeads = () => {
    setLeads(leadStore.getAllLeads());
  };

  useEffect(() => {
    if (isOpen) {
      refreshLeads();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0d121d] border-2 border-[#0052FF]/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden text-white flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0052FF]/20 text-[#38BDF8] border border-[#0052FF]/40 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bison font-black text-2xl text-white uppercase tracking-wide">
                Captured Racer Leads ({leads.length})
              </h3>
              <p className="text-xs text-slate-400">
                All visitor Names & WhatsApp numbers captured for customer acquisition
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => leadStore.exportToCSV()}
              className="px-4 py-2 rounded-xl bg-[#0052FF] hover:bg-[#2563EB] text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-[#0052FF]/30"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={refreshLeads}
              title="Refresh leads"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {leads.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <Users className="w-10 h-10 mx-auto text-slate-600 mb-2" />
              <div className="font-bold text-sm text-slate-300">No leads captured yet.</div>
              <p className="text-xs max-w-sm mx-auto">
                Visitor names and phone numbers entered into any of the forms or WhatsApp widgets will appear here instantly.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px] uppercase">
                    <th className="py-2.5 px-3">Lead ID</th>
                    <th className="py-2.5 px-3">Full Name</th>
                    <th className="py-2.5 px-3">WhatsApp Number</th>
                    <th className="py-2.5 px-3">Interest / Package</th>
                    <th className="py-2.5 px-3">Lead Source</th>
                    <th className="py-2.5 px-3">Captured At</th>
                    <th className="py-2.5 px-3">WhatsApp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3 font-mono text-slate-400">{lead.id}</td>
                      <td className="py-3 px-3 font-bold text-white">{lead.name}</td>
                      <td className="py-3 px-3 font-mono text-[#38BDF8] font-bold">
                        +91 {lead.phone}
                      </td>
                      <td className="py-3 px-3 text-slate-300">{lead.interest || 'General'}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-slate-300 text-[10px] font-mono">
                          {lead.source}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-400 text-[10px]">
                        {new Date(lead.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3 px-3">
                        <a
                          href={`https://wa.me/91${lead.phone}?text=${encodeURIComponent(`Hi ${lead.name}! This is Velocity International Circuit. We saw you claimed your ₹200 race voucher (code: ${lead.couponCode}). When would you like to race?`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-[#25d366]/20 text-[#25d366] hover:bg-[#25d366]/30 font-bold text-[10px] uppercase tracking-wider inline-flex items-center gap-1"
                        >
                          Chat
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

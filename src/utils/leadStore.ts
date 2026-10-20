export interface CapturedLead {
  id: string;
  name: string;
  phone: string;
  interest?: string;
  source: string;
  timestamp: string;
  couponCode: string;
}

const STORAGE_KEY = 'vic_captured_leads';

export const leadStore = {
  saveLead: (name: string, phone: string, interest: string = 'Go-Karting', source: string = 'Hero Form'): CapturedLead => {
    const leads = leadStore.getAllLeads();
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const newLead: CapturedLead = {
      id: 'LEAD-' + Math.floor(100000 + Math.random() * 900000),
      name: name.trim(),
      phone: cleanPhone || phone.trim(),
      interest,
      source,
      timestamp: new Date().toISOString(),
      couponCode: 'VELOCITY200'
    };

    leads.unshift(newLead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    return newLead;
  },

  getAllLeads: (): CapturedLead[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  exportToCSV: () => {
    const leads = leadStore.getAllLeads();
    if (leads.length === 0) {
      alert('No leads collected yet.');
      return;
    }

    const headers = ['ID', 'Name', 'Phone', 'Interest', 'Source', 'Timestamp', 'CouponCode'];
    const rows = leads.map(l => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.interest || ''}"`,
      `"${l.source}"`,
      `"${l.timestamp}"`,
      `"${l.couponCode}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Velocity_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

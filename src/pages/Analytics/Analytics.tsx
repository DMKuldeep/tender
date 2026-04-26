import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast, { useToast } from "../../components/Toast/Toast";
import "./Analytics.css";

// ── Mock Data ─────────────────────────────────────────────────────────────────
const MONTHLY_BIDS    = [18,24,21,32,28,38,34,44,40,36,48,52];
const MONTHLY_WON     = [ 6, 9, 8,14,11,18,13,20,17,15,22,24];
const MONTHLY_REVENUE = [42,56,51,78,68,92,84,108,96,88,114,128]; // in lakhs
const MONTHS          = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const PORTAL_DATA = [
  { name:"GeM",          bids:82,  won:44, color:"#2f80ed", pct:45 },
  { name:"CPPP",         bids:54,  won:28, color:"#0e9f85", pct:30 },
  { name:"IREPS",        bids:26,  won:12, color:"#f59e0b", pct:14 },
  { name:"State Portal", bids:14,  won:5,  color:"#7c3aed", pct:8  },
  { name:"DPSU",         bids:6,   won:1,  color:"#94a3b8", pct:3  },
];

const CATEGORY_DATA = [
  { name:"Infrastructure", bids:58, won:32, value:"₹8.4 Cr",  rate:55 },
  { name:"Healthcare",     bids:42, won:26, value:"₹3.1 Cr",  rate:62 },
  { name:"Technology",     bids:38, won:18, value:"₹1.8 Cr",  rate:47 },
  { name:"Energy",         bids:26, won:14, value:"₹12.6 Cr", rate:54 },
  { name:"Education",      bids:18, won:8,  value:"₹0.9 Cr",  rate:44 },
  { name:"Transport",      bids:14, won:6,  value:"₹5.2 Cr",  rate:43 },
];

const BID_HISTORY = [
  { id:"BID-001", tender:"Road Construction Materials", portal:"CPPP", value:"₹2.45 Cr", date:"Apr 01", result:"Won",     score:88 },
  { id:"BID-002", tender:"Medical Equipment Supply",    portal:"GeM",  value:"₹87.5 L",  date:"Mar 22", result:"Won",     score:91 },
  { id:"BID-003", tender:"IT Hardware Procurement",     portal:"GeM",  value:"₹32 L",    date:"Apr 10", result:"Pending", score:74 },
  { id:"BID-004", tender:"School Furniture Supply",     portal:"State",value:"₹18.5 L",  date:"Mar 15", result:"Lost",    score:58 },
  { id:"BID-005", tender:"Water Treatment Plant",       portal:"CPPP", value:"₹6.7 Cr",  date:"Apr 05", result:"Won",     score:85 },
  { id:"BID-006", tender:"Solar Power Plant EPC",       portal:"CPPP", value:"₹14.5 Cr", date:"Apr 12", result:"Pending", score:79 },
];

const STATUS_STYLE: Record<string,{bg:string;c:string}> = {
  Won:    {bg:"#dcfce7",c:"#166534"},
  Lost:   {bg:"#fee2e2",c:"#991b1b"},
  Pending:{bg:"#fef9c3",c:"#854d0e"},
};

const DATE_FILTERS = ["This Month","Last 3 Months","Last 6 Months","This Year","All Time"];

// ── Donut chart SVG ───────────────────────────────────────────────────────────
function DonutChart({ data }: { data: typeof PORTAL_DATA }) {
  const total = data.reduce((s,d) => s + d.bids, 0);
  let offset  = 0;
  const R = 52, C = 2 * Math.PI * R;

  return (
    <div className="donut-wrap">
      <svg width="130" height="130" viewBox="0 0 130 130" className="donut-svg">
        <circle cx="65" cy="65" r={R} fill="none" stroke="#f1f5f9" strokeWidth="18" />
        {data.map((d,i) => {
          const pct  = d.bids / total;
          const dash = pct * C;
          const gap  = C - dash;
          const rot  = (offset / total) * 360 - 90;
          offset    += d.bids;
          return (
            <circle key={i} cx="65" cy="65" r={R}
              fill="none" stroke={d.color} strokeWidth="18"
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={0}
              transform={`rotate(${rot} 65 65)`}
              style={{ transition:"stroke-dasharray .6s ease" }}
            />
          );
        })}
        <text x="65" y="62" textAnchor="middle" fill="#0f172a"
          style={{ fontFamily:"Inter,sans-serif", fontSize:18, fontWeight:800 }}>
          {total}
        </text>
        <text x="65" y="78" textAnchor="middle" fill="#94a3b8"
          style={{ fontFamily:"DM Sans,sans-serif", fontSize:10 }}>
          Total Bids
        </text>
      </svg>
      <div className="donut-legend">
        {data.map(d => (
          <div key={d.name} className="donut-legend-item">
            <div className="donut-dot" style={{ background:d.color }} />
            <span>{d.name}</span>
            <span style={{ marginLeft:"auto", fontWeight:700, color:"#374151" }}>{d.bids}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Simple line chart SVG ─────────────────────────────────────────────────────
function LineChart({ data, color="2f80ed" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const W = 400, H = 90, pad = 10;
  const pts = data.map((v,i) => {
    const x = pad + (i / (data.length-1)) * (W - pad*2);
    const y = H - pad - ((v/max) * (H - pad*2));
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="line-chart-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height:90 }}>
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={`#${color}`} stopOpacity=".2" />
            <stop offset="100%" stopColor={`#${color}`} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <polygon
          points={`${pad},${H} ${pts} ${W-pad},${H}`}
          fill={`url(#grad-${color})`}
        />
        {/* Line */}
        <polyline points={pts} fill="none" stroke={`#${color}`} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {/* Dots */}
        {pts.split(" ").map((pt,i) => {
          const [x,y] = pt.split(",").map(Number);
          return <circle key={i} cx={x} cy={y} r="3.5" fill={`#${color}`} stroke="#fff" strokeWidth="1.5" />;
        })}
      </svg>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Analytics() {
  const navigate  = useNavigate();
  const { toasts, remove, loading: toastLoading, success, dismiss } = useToast();
  const [dateFilter, setDateFilter] = useState("This Year");
  const [exporting,  setExporting]  = useState(false);

  const maxBid = Math.max(...MONTHLY_BIDS);
  const maxWon = Math.max(...MONTHLY_WON);

  // ── Export PDF (uses window.print with a styled print view) ─────────────────
  const handleExportPDF = async () => {
    setExporting(true);
    const id = toastLoading("Generating PDF report...", "Please wait a moment.");
    await new Promise(r => setTimeout(r, 1800));
    dismiss(id);
    setExporting(false);
    success("Report Ready!", "Your analytics report has been prepared. Printing dialog will open.");
    setTimeout(() => window.print(), 400);
  };

  // ── Export CSV ────────────────────────────────────────────────────────────────
  const handleExportCSV = () => {
    const rows = [
      ["Bid ID","Tender","Portal","Value","Date","Result","Match Score"],
      ...BID_HISTORY.map(b => [b.id, b.tender, b.portal, b.value, b.date, b.result, `${b.score}%`]),
    ];
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type:"text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "procurebrain_bids.csv"; a.click();
    URL.revokeObjectURL(url);
    success("CSV Exported!", "Your bid data has been downloaded as a CSV file.");
  };

  const totalBids = MONTHLY_BIDS.reduce((a,b) => a+b, 0);
  const totalWon  = MONTHLY_WON.reduce((a,b)  => a+b, 0);
  const winRate   = Math.round((totalWon / totalBids) * 100);

  const KPI_DATA = [
    { label:"Total Bids",    value:totalBids,    icon:"📋", bg:"#dbeafe", c:"#1d4ed8", trend:"+32% YoY",  up:true  },
    { label:"Bids Won",      value:totalWon,     icon:"🏆", bg:"#dcfce7", c:"#15803d", trend:"+41% YoY",  up:true  },
    { label:"Win Rate",      value:`${winRate}%`,icon:"📈", bg:"#f3e8ff", c:"#7c3aed", trend:"+6% vs avg", up:true  },
    { label:"Total Value",   value:"₹32.6 Cr",  icon:"💰", bg:"#fef9c3", c:"#b45309", trend:"+18% YoY",  up:true  },
    { label:"Avg Bid Score", value:"76%",         icon:"⚡", bg:"#fdf4ff", c:"#9333ea", trend:"+4pts",      up:true  },
    { label:"Portals Active",value:"5",           icon:"🔗", bg:"#f0fdfa", c:"#0f766e", trend:"All synced", up:true  },
  ];

  return (
    <>
      <div className="analytics-page">
        <div className="container-xl">

          {/* ── Header ── */}
          <div className="analytics-header">
            <div>
              <h1 className="analytics-title">Analytics & Reports</h1>
              <p className="analytics-sub">Tender performance, bid tracking and revenue insights</p>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <button className="btn-export" onClick={handleExportCSV}>
                📊 Export CSV
              </button>
              <button className={`btn-export primary ${exporting?"disabled":""}`}
                onClick={handleExportPDF} disabled={exporting}>
                {exporting ? "⏳ Generating..." : "📄 Export PDF Report"}
              </button>
            </div>
          </div>

          {/* ── Date Filters ── */}
          <div className="analytics-filters">
            <span style={{ fontSize:".82rem", color:"#64748b", fontWeight:600 }}>Period:</span>
            {DATE_FILTERS.map(f => (
              <button key={f} className={`filter-btn ${dateFilter===f?"active":""}`}
                onClick={() => setDateFilter(f)}>{f}</button>
            ))}
          </div>

          {/* ── KPI Cards ── */}
          <div className="row g-3 mb-4">
            {KPI_DATA.map(k => (
              <div key={k.label} className="col-6 col-lg-4 col-xl-2">
                <div className="kpi-card">
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                    <span className="kpi-label">{k.label}</span>
                    <div className="kpi-icon" style={{ background:k.bg }}>
                      <span style={{ fontSize:"1rem" }}>{k.icon}</span>
                    </div>
                  </div>
                  <div className="kpi-num" style={{ color:k.c }}>{k.value}</div>
                  <div className={`kpi-trend ${k.up?"trend-up":"trend-down"}`}>
                    {k.up ? "↑" : "↓"} {k.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Charts Row 1 ── */}
          <div className="row g-3 mb-3">

            {/* Monthly Bids Bar Chart */}
            <div className="col-lg-8">
              <div className="chart-card">
                <div className="chart-title">Monthly Bid Activity — {dateFilter}</div>
                <div className="chart-sub">Bids submitted vs won each month</div>
                <div className="bar-chart-wrap">
                  {MONTHLY_BIDS.map((v,i) => (
                    <div key={i} className="bar-col">
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, flex:1, justifyContent:"flex-end", width:"100%" }}>
                        <span className="bar-val">{MONTHLY_WON[i]}</span>
                        <div className="bar-fill" style={{ background:"#0e9f85", height:`${(MONTHLY_WON[i]/maxBid)*100}%`, opacity:.85 }} />
                        <div className="bar-fill" style={{ background:"#2f80ed", height:`${((v-MONTHLY_WON[i])/maxBid)*100}%`, opacity:.6 }} />
                      </div>
                      <span className="bar-label">{MONTHS[i].slice(0,3)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", gap:16, marginTop:10, fontSize:".74rem", color:"#64748b" }}>
                  <span style={{ display:"flex", alignItems:"center", gap:5 }}>
                    <span style={{ width:10, height:10, borderRadius:2, background:"#2f80ed", display:"inline-block" }} /> Submitted
                  </span>
                  <span style={{ display:"flex", alignItems:"center", gap:5 }}>
                    <span style={{ width:10, height:10, borderRadius:2, background:"#0e9f85", display:"inline-block" }} /> Won
                  </span>
                </div>
              </div>
            </div>

            {/* Portal Donut */}
            <div className="col-lg-4">
              <div className="chart-card" style={{ height:"100%" }}>
                <div className="chart-title">Bids by Portal</div>
                <div className="chart-sub">Distribution across portals</div>
                <DonutChart data={PORTAL_DATA} />
              </div>
            </div>
          </div>

          {/* ── Charts Row 2 ── */}
          <div className="row g-3 mb-3">

            {/* Revenue Line Chart */}
            <div className="col-lg-6">
              <div className="chart-card">
                <div className="chart-title">Revenue Trend (₹ Lakhs)</div>
                <div className="chart-sub">Monthly tender value won</div>
                <LineChart data={MONTHLY_REVENUE} color="1d4ed8" />
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
                  {MONTHS.filter((_,i)=>i%3===0).map(m=>(
                    <span key={m} style={{ fontSize:".65rem", color:"#94a3b8" }}>{m}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Win rate by category */}
            <div className="col-lg-6">
              <div className="chart-card">
                <div className="chart-title">Win Rate by Category</div>
                <div className="chart-sub">Success rate per sector</div>
                {CATEGORY_DATA.map(c => (
                  <div key={c.name} className="progress-row">
                    <div className="progress-label-row">
                      <span style={{ fontSize:".82rem", color:"#374151", fontWeight:500 }}>{c.name}</span>
                      <span style={{ fontSize:".8rem", fontWeight:700, color: c.rate>=55?"#16a34a":"#f59e0b" }}>{c.rate}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{
                        width:`${c.rate}%`,
                        background: c.rate>=55 ? "#16a34a" : c.rate>=50 ? "#f59e0b" : "#dc2626"
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Category Performance Table ── */}
          <div className="analytics-table mb-3">
            <div style={{ padding:"16px 20px", borderBottom:"1px solid #f1f5f9", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontWeight:800, fontSize:"1rem", color:"#0f172a", fontFamily:"Inter,sans-serif" }}>Category Performance</span>
              <button className="btn-export" onClick={handleExportCSV}>↓ CSV</button>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table>
                <thead>
                  <tr><th>Category</th><th>Bids</th><th>Won</th><th>Lost</th><th>Win Rate</th><th>Total Value</th></tr>
                </thead>
                <tbody>
                  {CATEGORY_DATA.map(c => (
                    <tr key={c.name}>
                      <td style={{ fontWeight:600, color:"#0f172a" }}>{c.name}</td>
                      <td>{c.bids}</td>
                      <td style={{ color:"#16a34a", fontWeight:700 }}>{c.won}</td>
                      <td style={{ color:"#dc2626" }}>{c.bids - c.won}</td>
                      <td>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <div style={{ flex:1, height:6, background:"#f1f5f9", borderRadius:3, overflow:"hidden", minWidth:50 }}>
                            <div style={{ height:"100%", width:`${c.rate}%`, background: c.rate>=55?"#16a34a":"#f59e0b", borderRadius:3 }} />
                          </div>
                          <span style={{ fontSize:".8rem", fontWeight:700, minWidth:32 }}>{c.rate}%</span>
                        </div>
                      </td>
                      <td style={{ fontWeight:700, color:"#1a56a0" }}>{c.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Bid History Table ── */}
          <div className="analytics-table">
            <div style={{ padding:"16px 20px", borderBottom:"1px solid #f1f5f9", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
              <span style={{ fontWeight:800, fontSize:"1rem", color:"#0f172a", fontFamily:"Inter,sans-serif" }}>Detailed Bid History</span>
              <div style={{ display:"flex", gap:8 }}>
                <button className="btn-export" onClick={handleExportCSV}>📊 Export CSV</button>
                <button className="btn-export primary" onClick={handleExportPDF} disabled={exporting}>
                  📄 Export PDF
                </button>
              </div>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table>
                <thead>
                  <tr><th>Bid ID</th><th>Tender</th><th>Portal</th><th>Value</th><th>Date</th><th>Match Score</th><th>Result</th></tr>
                </thead>
                <tbody>
                  {BID_HISTORY.map(b => (
                    <tr key={b.id}>
                      <td style={{ color:"#2f80ed", fontWeight:600, fontSize:".81rem" }}>{b.id}</td>
                      <td style={{ fontWeight:500 }}>{b.tender}</td>
                      <td><span style={{ background:"#f0f9ff", color:"#0284c7", border:"1px solid #bae6fd", borderRadius:50, padding:"2px 8px", fontSize:".71rem", fontWeight:700 }}>{b.portal}</span></td>
                      <td style={{ fontWeight:700, color:"#1a56a0" }}>{b.value}</td>
                      <td style={{ color:"#64748b", fontSize:".82rem" }}>{b.date}</td>
                      <td>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <div style={{ flex:1, height:6, background:"#f1f5f9", borderRadius:3, overflow:"hidden", minWidth:40 }}>
                            <div style={{ height:"100%", width:`${b.score}%`, background:b.score>=80?"#16a34a":b.score>=60?"#f59e0b":"#dc2626", borderRadius:3 }} />
                          </div>
                          <span style={{ fontSize:".78rem", fontWeight:700 }}>{b.score}%</span>
                        </div>
                      </td>
                      <td><span style={{ ...STATUS_STYLE[b.result], borderRadius:50, padding:"3px 10px", fontSize:".74rem", fontWeight:700 }}>{b.result}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      <Toast toasts={toasts} remove={remove} />
    </>
  );
}

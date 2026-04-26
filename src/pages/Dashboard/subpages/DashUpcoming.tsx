import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fmt } from "../../../utils";

// ── Upcoming tender data ──────────────────────────────────────────────────────
const UPCOMING = [
  {
    id: "UP-001",
    title: "Smart City Infrastructure Phase 3",
    category: "Infrastructure",
    portal: "CPPP",
    icon: "🏙️",
    est_value: 280000000,
    publish_date: new Date(Date.now() + 2 * 86400000).toISOString(),  // 2 days
    priority: "High",
    source: "Ministry of Housing",
    desc: "Smart roads, IoT sensors, and integrated traffic management for 5 tier-2 cities.",
    notify: false,
  },
  {
    id: "UP-002",
    title: "National Solar Mission — Batch 14",
    category: "Energy",
    portal: "MNRE",
    icon: "☀️",
    est_value: 1450000000,
    publish_date: new Date(Date.now() + 5 * 86400000).toISOString(),  // 5 days
    priority: "High",
    source: "Ministry of New & Renewable Energy",
    desc: "Procurement of 2000MW solar capacity under PM-KUSUM scheme across 8 states.",
    notify: false,
  },
  {
    id: "UP-003",
    title: "District Hospital Equipment Upgrade",
    category: "Healthcare",
    portal: "GeM",
    icon: "🏥",
    est_value: 45000000,
    publish_date: new Date(Date.now() + 7 * 86400000).toISOString(),  // 7 days
    priority: "Medium",
    source: "Ministry of Health",
    desc: "Advanced diagnostic equipment for 120 district hospitals under Ayushman Bharat.",
    notify: false,
  },
  {
    id: "UP-004",
    title: "Railway Electrification — Zone 4",
    category: "Transport",
    portal: "IREPS",
    icon: "⚡",
    est_value: 620000000,
    publish_date: new Date(Date.now() + 10 * 86400000).toISOString(), // 10 days
    priority: "High",
    source: "Ministry of Railways",
    desc: "Complete electrification of 850km network across eastern railway zone 4.",
    notify: false,
  },
  {
    id: "UP-005",
    title: "PMGSY Road Construction — Phase 4",
    category: "Infrastructure",
    portal: "CPPP",
    icon: "🛣️",
    est_value: 185000000,
    publish_date: new Date(Date.now() + 14 * 86400000).toISOString(), // 14 days
    priority: "Medium",
    source: "Ministry of Rural Development",
    desc: "Construction of 3,200km all-weather rural roads under PMGSY Phase 4.",
    notify: false,
  },
  {
    id: "UP-006",
    title: "Defence Equipment Procurement",
    category: "Defence",
    portal: "DPSU",
    icon: "🛡️",
    est_value: 9800000000,
    publish_date: new Date(Date.now() + 21 * 86400000).toISOString(), // 21 days
    priority: "Critical",
    source: "Ministry of Defence",
    desc: "Multi-role utility vehicles and communication equipment for border deployment.",
    notify: false,
  },
];

const PRIORITY_STYLE: Record<string, { bg:string; c:string }> = {
  Critical: { bg:"#fef2f2", c:"#dc2626" },
  High:     { bg:"#fff7ed", c:"#c2410c" },
  Medium:   { bg:"#fefce8", c:"#a16207" },
  Low:      { bg:"#f0fdf4", c:"#15803d" },
};

// ── Countdown Hook ─────────────────────────────────────────────────────────────
function useCountdown(targetISO: string) {
  const calc = () => {
    const diff = new Date(targetISO).getTime() - Date.now();
    if (diff <= 0) return { d:0, h:0, m:0, s:0, done:true };
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { d, h, m, s, done:false };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, [targetISO]);
  return time;
}

// ── Countdown Badge ────────────────────────────────────────────────────────────
function CountdownBadge({ iso }: { iso: string }) {
  const { d, h, m, s, done } = useCountdown(iso);
  if (done) return <span style={{ color:"#dc2626", fontWeight:700, fontSize:".8rem" }}>Publish Imminent</span>;
  return (
    <div style={{ display:"flex", gap:6 }}>
      {[{ v:d, l:"d" }, { v:h, l:"h" }, { v:m, l:"m" }, { v:s, l:"s" }].map(x => (
        <div key={x.l} style={{
          background:"#0f172a", color:"#fff", borderRadius:7,
          padding:"4px 8px", textAlign:"center", minWidth:36,
        }}>
          <div style={{ fontFamily:"Inter,sans-serif", fontWeight:800, fontSize:".88rem", lineHeight:1 }}>
            {String(x.v).padStart(2,"0")}
          </div>
          <div style={{ fontSize:".55rem", color:"rgba(255,255,255,.5)", marginTop:1, textTransform:"uppercase", letterSpacing:.5 }}>
            {x.l}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function DashUpcoming() {
  const navigate  = useNavigate();
  const [items, setItems]     = useState(UPCOMING);
  const [filter, setFilter]   = useState("All");
  const [notifiedIds, setNotifiedIds] = useState<string[]>([]);

  const categories = ["All", ...Array.from(new Set(UPCOMING.map(u => u.category)))];

  const filtered = filter === "All" ? items : items.filter(u => u.category === filter);

  const toggleNotify = (id: string) => {
    setNotifiedIds(n =>
      n.includes(id) ? n.filter(x => x !== id) : [...n, id]
    );
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 className="dash-page-title">Upcoming Tenders 🔮</h2>
          <p className="dash-page-sub">
            Priority tenders expected to be published soon — set alerts to be first in line
          </p>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:".8rem", color:"#64748b", fontWeight:600 }}>
            🔔 {notifiedIds.length} alerts set
          </span>
        </div>
      </div>

      {/* Stats strip */}
      <div className="row g-3 mb-4">
        {[
          { l:"Upcoming This Week",  n: items.filter(u => new Date(u.publish_date).getTime() - Date.now() < 7*86400000).length, c:"#dc2626", bg:"#fef2f2" },
          { l:"High Priority",       n: items.filter(u => u.priority === "High" || u.priority === "Critical").length,           c:"#c2410c", bg:"#fff7ed" },
          { l:"Est. Total Value",    n: "₹" + (items.reduce((s,u) => s + u.est_value, 0) / 10000000).toFixed(0) + " Cr",       c:"#1a56a0", bg:"#dbeafe" },
          { l:"Alerts Set",          n: notifiedIds.length,                                                                      c:"#15803d", bg:"#dcfce7" },
        ].map(s => (
          <div key={s.l} className="col-6 col-md-3">
            <div className="stat-card">
              <div className="stat-label mb-1">{s.l}</div>
              <div className="stat-num" style={{ color:s.c, fontSize:"1.5rem" }}>{s.n}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Category filter */}
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            style={{
              background: filter===c ? "#0f172a" : "#fff",
              color:      filter===c ? "#fff"    : "#374151",
              border:"1.5px solid", borderColor: filter===c ? "#0f172a" : "#e2e8f0",
              borderRadius:8, padding:"6px 14px", fontSize:".82rem",
              fontWeight:600, cursor:"pointer", fontFamily:"inherit", transition:"all .18s",
            }}>
            {c}
          </button>
        ))}
      </div>

      {/* Upcoming cards */}
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {filtered.map(u => {
          const notified = notifiedIds.includes(u.id);
          const daysAway = Math.ceil((new Date(u.publish_date).getTime() - Date.now()) / 86400000);
          return (
            <div key={u.id} style={{
              background:"#fff", border:"1.5px solid #e2e8f0", borderRadius:14,
              padding:"20px 22px", transition:"all .2s", position:"relative",
              borderLeft:`4px solid ${PRIORITY_STYLE[u.priority]?.c || "#e2e8f0"}`,
            }}>
              <div style={{ display:"flex", gap:16, alignItems:"flex-start", flexWrap:"wrap" }}>

                {/* Icon */}
                <div style={{ width:52, height:52, borderRadius:12, background:"#f8fafc", border:"1px solid #e2e8f0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.7rem", flexShrink:0 }}>
                  {u.icon}
                </div>

                {/* Content */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:4 }}>
                    <span style={{ fontWeight:800, color:"#0f172a", fontSize:".97rem" }}>{u.title}</span>
                    <span style={{ ...PRIORITY_STYLE[u.priority], borderRadius:50, padding:"2px 10px", fontSize:".72rem", fontWeight:700 }}>
                      {u.priority}
                    </span>
                  </div>

                  <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:8 }}>
                    <span style={{ fontSize:".78rem", color:"#64748b" }}>📍 {u.source}</span>
                    <span style={{ fontSize:".78rem", color:"#64748b" }}>🏷 {u.category}</span>
                    <span style={{ background:"#f0f9ff", color:"#0284c7", border:"1px solid #bae6fd", borderRadius:50, padding:"1px 8px", fontSize:".71rem", fontWeight:700 }}>{u.portal}</span>
                  </div>

                  <p style={{ fontSize:".83rem", color:"#64748b", lineHeight:1.5, marginBottom:12 }}>{u.desc}</p>

                  <div style={{ display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
                    {/* Estimated value */}
                    <div>
                      <div style={{ fontSize:".71rem", color:"#94a3b8", fontWeight:600, textTransform:"uppercase", letterSpacing:.5 }}>Est. Value</div>
                      <div style={{ fontFamily:"Inter,sans-serif", fontWeight:800, color:"#1a56a0", fontSize:"1rem" }}>{fmt(u.est_value)}</div>
                    </div>

                    {/* Publish date */}
                    <div>
                      <div style={{ fontSize:".71rem", color:"#94a3b8", fontWeight:600, textTransform:"uppercase", letterSpacing:.5, marginBottom:2 }}>
                        Publishes In
                      </div>
                      <CountdownBadge iso={u.publish_date} />
                    </div>

                    {/* Days label */}
                    <div style={{ fontSize:".8rem", color: daysAway<=3?"#dc2626":"#64748b", fontWeight: daysAway<=3?700:400 }}>
                      {daysAway<=3 ? "⚠️ " : "📅 "}{daysAway} days away
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display:"flex", flexDirection:"column", gap:8, flexShrink:0 }}>
                  <button
                    onClick={() => toggleNotify(u.id)}
                    style={{
                      background: notified ? "#dcfce7" : "#fff",
                      border:`1.5px solid ${notified ? "#16a34a" : "#e2e8f0"}`,
                      color:      notified ? "#16a34a"  : "#374151",
                      borderRadius:8, padding:"8px 14px", fontSize:".82rem",
                      fontWeight:700, cursor:"pointer", fontFamily:"inherit",
                      transition:"all .2s", whiteSpace:"nowrap",
                    }}>
                    {notified ? "✅ Alert On" : "🔔 Notify Me"}
                  </button>
                  <button className="btn-outline-gem" style={{ fontSize:".82rem", padding:"8px 14px" }}
                    onClick={() => navigate("/tenders")}>
                    View Similar →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom tip */}
      <div style={{ background:"#f0f9ff", border:"1px solid #bae6fd", borderRadius:12, padding:"16px 20px", marginTop:24, display:"flex", gap:12, alignItems:"flex-start" }}>
        <span style={{ fontSize:"1.2rem" }}>💡</span>
        <div>
          <div style={{ fontWeight:700, color:"#0f172a", fontSize:".9rem", marginBottom:3 }}>
            How does this work?
          </div>
          <div style={{ fontSize:".82rem", color:"#0284c7", lineHeight:1.6 }}>
            These tenders are sourced from Ministry announcements, press releases, and planning feeds.
            Click <strong>Notify Me</strong> to get an instant alert the moment the tender is officially published on the portal.
            All estimated values and dates are indicative — actual figures may vary.
          </div>
        </div>
      </div>
    </div>
  );
}

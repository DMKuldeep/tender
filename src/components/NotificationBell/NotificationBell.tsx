import { useState } from "react";
import "./NotificationBell.css";

const NOTIFS = [
  { id:1, type:"new",    title:"New tender matched",     desc:"Road Construction NH-58 matches your profile", time:"2m ago",  read:false },
  { id:2, type:"bid",    title:"Bid accepted",           desc:"Medical Equipment Supply — your bid was shortlisted", time:"1h ago",  read:false },
  { id:3, type:"alert",  title:"Deadline approaching",   desc:"Solar Power Plant EPC closes in 3 days", time:"3h ago",  read:false },
  { id:4, type:"system", title:"Workspace updated",      desc:"2 new team members joined Tenant A", time:"1d ago",  read:true  },
  { id:5, type:"new",    title:"New tender matched",     desc:"IT Hardware Procurement — GeM portal", time:"2d ago",  read:true  },
];

const TYPE_ICON: Record<string,string> = { new:"🔵", bid:"🟢", alert:"🟠", system:"⚪" };

export default function NotificationBell() {
  const [open, setOpen]     = useState(false);
  const [notifs, setNotifs] = useState(NOTIFS);
  const unread = notifs.filter(n => !n.read).length;

  const markAll = () => setNotifs(n => n.map(x => ({ ...x, read: true })));

  return (
    <div className="nb-wrap">
      <button className="nb-btn" onClick={() => setOpen(o => !o)} aria-label="Notifications">
        🔔
        {unread > 0 && <span className="nb-badge">{unread}</span>}
      </button>

      {open && (
        <>
          <div className="nb-overlay" onClick={() => setOpen(false)} />
          <div className="nb-panel">
            <div className="nb-header">
              <span className="nb-title">Notifications</span>
              {unread > 0 && <button className="nb-mark-all" onClick={markAll}>Mark all read</button>}
            </div>
            <div className="nb-list">
              {notifs.map(n => (
                <div key={n.id} className={`nb-item${n.read ? "" : " unread"}`}
                  onClick={() => setNotifs(ns => ns.map(x => x.id===n.id ? {...x,read:true} : x))}>
                  <span className="nb-type-icon">{TYPE_ICON[n.type]}</span>
                  <div className="nb-item-body">
                    <div className="nb-item-title">{n.title}</div>
                    <div className="nb-item-desc">{n.desc}</div>
                    <div className="nb-item-time">{n.time}</div>
                  </div>
                  {!n.read && <span className="nb-dot" />}
                </div>
              ))}
            </div>
            <div className="nb-footer">
              <button className="nb-view-all">View all notifications →</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

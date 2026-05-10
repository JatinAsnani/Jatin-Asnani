import { useState } from "react";

const C = {
  primary: "#D25353",
  primaryLight: "#EA7B7B",
  primaryDark: "#9E3B3B",
  cream: "#FFEAD3",
  white: "#fff",
  text: "#2C1810",
  textMuted: "#7A4040",
  textLight: "#B07070",
  border: "#F0C4A8",
  cardBg: "#FFF8F3",
  shadow: "rgba(210,83,83,0.10)",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    color: ${C.text};
    min-height: 100vh;
    background:
      radial-gradient(circle at top left, rgba(234,123,123,0.25), transparent 35%),
      radial-gradient(circle at bottom right, rgba(255,234,211,0.6), transparent 40%),
      linear-gradient(135deg, #FFEAD3 0%, #F9E3E3 50%, #FFEAD3 100%);
    background-attachment: fixed;
  }

  .page {
    width: 100%;
    max-width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 32px 48px 48px;
  }

  .page-head {
    margin-bottom: 28px;
  }

  .page-title {
    font-family: 'Playfair Display', serif;
    font-size: 42px;
    font-weight: 700;
    color: ${C.primaryDark};
    margin-bottom: 6px;
  }

  .page-sub {
    font-size: 15px;
    color: ${C.textMuted};
  }

  /* Shared glass effect */
  .glass,
  .card,
  .tabs,
  .form-input,
  .btn-ghost,
  .dest-item,
  .modal,
  .toast {
    background: rgba(255,255,255,0.18);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(255,255,255,0.35);
    box-shadow:
      0 8px 32px rgba(31, 38, 135, 0.08),
      inset 0 1px 0 rgba(255,255,255,0.35);
  }

  .tabs {
    display: flex;
    gap: 6px;
    width: 100%;
    padding: 8px;
    border-radius: 18px;
    margin-bottom: 28px;
    flex-wrap: wrap;
  }

  .tab {
    padding: 10px 20px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    background: transparent;
    color: ${C.textMuted};
    transition: all .2s ease;
  }

  .tab.active {
    background: linear-gradient(135deg, ${C.primary}, ${C.primaryDark});
    color: white;
    box-shadow: 0 8px 20px rgba(210,83,83,0.25);
  }

  .layout {
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: 32px;
    align-items: start;
    width: 100%;
  }

  .card {
    border-radius: 24px;
    padding: 28px;
  }

  .card + .card { margin-top: 20px; }

  .card-title {
    font-size: 16px;
    font-weight: 700;
    color: ${C.primaryDark};
    margin-bottom: 18px;
  }

  .avatar-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 0 20px;
    border-bottom: 1px solid rgba(255,255,255,0.25);
    margin-bottom: 20px;
  }

  .avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${C.primaryLight}, ${C.primaryDark});
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: 700;
    color: white;
    border: 4px solid rgba(255,255,255,0.4);
    margin-bottom: 12px;
  }

  .avatar-name {
    font-size: 20px;
    font-weight: 700;
    color: ${C.primaryDark};
  }

  .avatar-email, .avatar-edit {
    font-size: 12px;
    color: ${C.textMuted};
    margin-top: 4px;
  }

  .avatar-edit {
    color: ${C.primary};
    font-weight: 600;
    cursor: pointer;
  }

  .stat-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 20px;
  }

  .stat-mini {
    background: rgba(255,255,255,0.15);
    border-radius: 14px;
    padding: 12px 10px;
    text-align: center;
  }

  .stat-mini-val {
    font-size: 22px;
    font-weight: 700;
    color: ${C.primaryDark};
  }

  .stat-mini-label {
    font-size: 11px;
    color: ${C.textMuted};
  }

  .side-nav { display: flex; flex-direction: column; gap: 6px; }

  .side-nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 12px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    color: ${C.textMuted};
    text-align: left;
    width: 100%;
    transition: all .2s ease;
  }

  .side-nav-item:hover {
    background: rgba(255,255,255,0.18);
    color: ${C.primaryDark};
  }

  .side-nav-divider {
    height: 1px;
    background: rgba(255,255,255,0.25);
    margin: 6px 0;
  }

  .form-section { margin-bottom: 28px; }
  .form-section-title,
  .form-label {
    color: ${C.textMuted};
    font-size: 12px;
    font-weight: 600;
  }

  .form-section-title {
    text-transform: uppercase;
    letter-spacing: .08em;
    margin-bottom: 14px;
  }

  .form-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .form-group { margin-bottom: 14px; }

  .form-label {
    display: block;
    margin-bottom: 6px;
  }

  .form-input {
    width: 100%;
    padding: 12px 14px;
    border-radius: 12px;
    color: ${C.text};
    font-size: 14px;
    outline: none;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 10px 20px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border: none;
  }

  .btn-primary {
    background: linear-gradient(135deg, ${C.primary}, ${C.primaryDark});
    color: white;
    box-shadow: 0 8px 20px rgba(210,83,83,0.2);
  }

  .btn-sm { padding: 6px 14px; font-size: 12px; }

  .flex { display: flex; }
  .gap-10 { gap: 10px; }

  .toggle-row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255,255,255,0.25);
  }

  .toggle-row:last-child { border-bottom: none; }

  .toggle {
    width: 42px;
    height: 24px;
    border-radius: 999px;
    border: none;
    position: relative;
    cursor: pointer;
    background: rgba(255,255,255,0.3);
  }

  .toggle.on { background: ${C.primary}; }

  .toggle-thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: white;
    transition: all .2s;
  }

  .toggle.on .toggle-thumb { left: 21px; }

  .dest-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    border-radius: 14px;
    margin-bottom: 10px;
  }

  .toast {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 999;
    padding: 14px 22px;
    border-radius: 14px;
    color: white;
    background: rgba(158,59,59,0.75);
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.28);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    width: 90%;
    max-width: 420px;
    padding: 32px;
    border-radius: 24px;
  }

  .danger-zone {
    border: 1px solid rgba(255, 140, 140, 0.35);
    border-radius: 24px;
    padding: 24px;
    background: rgba(255,250,250,0.18);
    backdrop-filter: blur(18px);
  }

  @media (max-width: 1200px) {
    .page { padding: 24px; }
    .layout { grid-template-columns: 1fr; }
  }

  @media (max-width: 768px) {
    .page { padding: 16px; }
    .page-title { font-size: 30px; }
    .form-grid-2 { grid-template-columns: 1fr; }
  }
`;

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toggle({ on, onChange }) {
  return (
    <button className={`toggle${on ? " on" : ""}`} onClick={() => onChange(!on)}>
      <div className="toggle-thumb" />
    </button>
  );
}

function PasswordStrength({ val }) {
  const strength = val.length === 0 ? 0 : val.length < 6 ? 1 : val.length < 10 ? 2 : val.length < 14 ? 3 : 4;
  const colors = ["", "#e74c3c", "#e67e22", "#f1c40f", "#2ecc71"];
  const labels = ["", "Too weak", "Weak", "Good", "Strong"];
  return (
    <div>
      <div className="strength-bar">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="strength-seg" style={{ background: i <= strength ? colors[strength] : "" }} />
        ))}
      </div>
      {val.length > 0 && <div style={{ fontSize: 11, marginTop: 4, color: colors[strength] }}>{labels[strength]}</div>}
    </div>
  );
}

// ─── TAB: Personal Info ───────────────────────────────────────────────────────
function TabPersonal({ toast }) {
  const [form, setForm] = useState({ firstName: "Alex", lastName: "Johnson", email: "alex@email.com", phone: "+91 98765 43210", bio: "Passionate solo traveller. 20+ countries visited. Always planning the next adventure.", dob: "1995-07-14", gender: "Prefer not to say" });
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <div>
      {/* Avatar inline at top of right panel */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px 24px", background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})`, borderRadius: 16, marginBottom: 24 }}>
        <div className="avatar" style={{ marginBottom: 0, width: 64, height: 64, fontSize: 22, border: `3px solid rgba(255,234,211,0.4)` }}>AJ</div>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: C.cream }}>Alex Johnson</div>
          <div style={{ fontSize: 12, color: "rgba(255,234,211,0.65)", marginTop: 2 }}>Travel Enthusiast · Member since Jan 2024</div>
          <button className="btn btn-sm" style={{ marginTop: 8, background: "rgba(255,234,211,0.18)", color: C.cream, border: "1px solid rgba(255,234,211,0.25)" }}>Change Photo</button>
        </div>
      </div>

      <div className="card">
        <div className="form-section">
          <div className="form-section-title">Basic Info</div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input className="form-input" value={form.firstName} onChange={f("firstName")} />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input className="form-input" value={form.lastName} onChange={f("lastName")} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" value={form.email} onChange={f("email")} />
          </div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-input" value={form.phone} onChange={f("phone")} />
            </div>
            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input className="form-input" type="date" value={form.dob} onChange={f("dob")} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Gender</label>
            <select className="form-input" value={form.gender} onChange={f("gender")}>
              {["Male", "Female", "Non-binary", "Prefer not to say"].map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-title">About You</div>
          <div className="form-group">
            <label className="form-label">Bio</label>
            <textarea className="form-input" style={{ minHeight: 90, resize: "vertical" }} value={form.bio} onChange={f("bio")} />
          </div>
        </div>

        <div className="flex gap-10">
          <button className="btn btn-primary" onClick={() => toast("Profile saved successfully ✓")}>Save Changes</button>
          <button className="btn btn-ghost">Discard</button>
        </div>
      </div>
    </div>
  );
}

// ─── TAB: Security ────────────────────────────────────────────────────────────
function TabSecurity({ toast }) {
  const [curr, setCurr] = useState("");
  const [next, setNext] = useState("");
  const [conf, setConf] = useState("");
  const [twoFA, setTwoFA] = useState(true);
  const [sessions] = useState([
    { device: "Chrome · Windows", location: "Vadodara, IN", time: "Now", current: true },
    { device: "Safari · iPhone 15", location: "Mumbai, IN", time: "2 days ago", current: false },
    { device: "Firefox · MacBook", location: "Delhi, IN", time: "5 days ago", current: false },
  ]);

  return (
    <div>
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-title">Change Password</div>
        <div className="form-group">
          <label className="form-label">Current Password</label>
          <input className="form-input" type="password" placeholder="••••••••" value={curr} onChange={e => setCurr(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">New Password</label>
          <input className="form-input" type="password" placeholder="••••••••" value={next} onChange={e => setNext(e.target.value)} />
          <PasswordStrength val={next} />
        </div>
        <div className="form-group">
          <label className="form-label">Confirm New Password</label>
          <input className="form-input" type="password" placeholder="••••••••" value={conf} onChange={e => setConf(e.target.value)} />
          {conf && next && conf !== next && <div style={{ fontSize: 11, color: "#c0392b", marginTop: 4 }}>Passwords don't match</div>}
          {conf && next && conf === next && next.length >= 8 && <div style={{ fontSize: 11, color: "#2ecc71", marginTop: 4 }}>Passwords match ✓</div>}
        </div>
        <button className="btn btn-primary" onClick={() => toast("Password updated ✓")}>Update Password</button>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-title">Two-Factor Authentication</div>
        <div className="toggle-row">
          <div className="toggle-info">
            <div className="toggle-label">Authenticator App</div>
            <div className="toggle-desc">Use an app like Google Authenticator for extra security.</div>
          </div>
          <Toggle on={twoFA} onChange={setTwoFA} />
        </div>
        {twoFA && (
          <div style={{ marginTop: 12, padding: "12px 16px", background: "#e8f7ee", borderRadius: 10, fontSize: 13, color: "#2d7a4f" }}>
            ✓ Two-factor authentication is active. Your account is protected.
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title">Active Sessions</div>
        {sessions.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < sessions.length - 1 ? `1px solid ${C.border}` : "none" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.primaryDark }}>{s.device}</span>
                {s.current && <span className="badge badge-success">Current</span>}
              </div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{s.location} · {s.time}</div>
            </div>
            {!s.current && <button className="btn btn-sm btn-danger" onClick={() => toast("Session revoked")}>Revoke</button>}
          </div>
        ))}
        <button className="btn btn-danger btn-sm" style={{ marginTop: 12 }} onClick={() => toast("All other sessions signed out")}>Sign Out All Other Sessions</button>
      </div>
    </div>
  );
}

// ─── TAB: Notifications ───────────────────────────────────────────────────────
function TabNotifications({ toast }) {
  const [prefs, setPrefs] = useState({
    tripReminders: true, budgetAlerts: true, communityUpdates: false,
    weeklyDigest: true, promotions: false, travelTips: true,
    emailNotifs: true, pushNotifs: false, smsNotifs: false,
  });
  const toggle = (k) => setPrefs({ ...prefs, [k]: !prefs[k] });

  const groups = [
    {
      title: "Trip Activity",
      items: [
        { key: "tripReminders", label: "Trip Reminders", desc: "Get reminded 7 days before your trip departs." },
        { key: "budgetAlerts", label: "Budget Alerts", desc: "Alerts when spending approaches or exceeds budget." },
      ],
    },
    {
      title: "Community & Content",
      items: [
        { key: "communityUpdates", label: "Community Updates", desc: "When someone copies or comments on your itinerary." },
        { key: "weeklyDigest", label: "Weekly Digest", desc: "Top destinations and travel tips every Sunday." },
        { key: "travelTips", label: "Travel Tips", desc: "Personalised destination insights and packing tips." },
        { key: "promotions", label: "Promotions & Offers", desc: "Deals from our travel partners." },
      ],
    },
    {
      title: "Channels",
      items: [
        { key: "emailNotifs", label: "Email", desc: "Receive notifications via email." },
        { key: "pushNotifs", label: "Push Notifications", desc: "Browser and app push notifications." },
        { key: "smsNotifs", label: "SMS", desc: "Text messages for critical alerts only." },
      ],
    },
  ];

  return (
    <div>
      {groups.map((g) => (
        <div className="card" key={g.title} style={{ marginBottom: 20 }}>
          <div className="card-title">{g.title}</div>
          {g.items.map((item) => (
            <div className="toggle-row" key={item.key}>
              <div className="toggle-info">
                <div className="toggle-label">{item.label}</div>
                <div className="toggle-desc">{item.desc}</div>
              </div>
              <Toggle on={prefs[item.key]} onChange={() => toggle(item.key)} />
            </div>
          ))}
        </div>
      ))}
      <button className="btn btn-primary" onClick={() => toast("Notification preferences saved ✓")}>Save Preferences</button>
    </div>
  );
}

// ─── TAB: Preferences ─────────────────────────────────────────────────────────
function TabPreferences({ toast }) {
  const [prefs, setPrefs] = useState({
    language: "English", currency: "USD", timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY", distanceUnit: "km", theme: "light",
  });
  const f = (k) => (e) => setPrefs({ ...prefs, [k]: e.target.value });

  const saved = [
    { e: "🗼", name: "Paris", country: "France" },
    { e: "⛩️", name: "Kyoto", country: "Japan" },
    { e: "🗽", name: "New York", country: "USA" },
    { e: "🏛️", name: "Rome", country: "Italy" },
  ];
  const [destinations, setDestinations] = useState(saved);

  return (
    <div>
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="form-section">
          <div className="form-section-title">Regional</div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Language</label>
              <select className="form-input" value={prefs.language} onChange={f("language")}>
                {["English", "Hindi", "Spanish", "French", "German", "Japanese"].map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Currency</label>
              <select className="form-input" value={prefs.currency} onChange={f("currency")}>
                {["USD", "EUR", "GBP", "INR", "JPY", "AED"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Timezone</label>
              <select className="form-input" value={prefs.timezone} onChange={f("timezone")}>
                {["Asia/Kolkata", "Europe/London", "America/New_York", "Asia/Tokyo", "Australia/Sydney"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Date Format</label>
              <select className="form-input" value={prefs.dateFormat} onChange={f("dateFormat")}>
                {["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Distance Unit</label>
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              {["km", "mi"].map(u => (
                <button key={u} className="btn btn-sm" style={{ flex: 1, justifyContent: "center", background: prefs.distanceUnit === u ? C.primary : C.cardBg, color: prefs.distanceUnit === u ? C.white : C.textMuted, border: `1px solid ${prefs.distanceUnit === u ? C.primary : C.border}` }} onClick={() => setPrefs({ ...prefs, distanceUnit: u })}>{u}</button>
              ))}
            </div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => toast("Preferences saved ✓")}>Save Preferences</button>
      </div>

      <div className="card">
        <div className="card-title">Saved Destinations</div>
        {destinations.map((d, i) => (
          <div className="dest-item" key={d.name}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="dest-emoji">{d.e}</span>
              <div>
                <div className="dest-name">{d.name}</div>
                <div className="dest-country">{d.country}</div>
              </div>
            </div>
            <button className="btn btn-sm btn-ghost" onClick={() => setDestinations(destinations.filter((_, j) => j !== i))}>Remove</button>
          </div>
        ))}
        <button className="btn btn-ghost btn-sm" style={{ marginTop: 4 }}>+ Add Destination</button>
      </div>
    </div>
  );
}

// ─── TAB: Danger Zone ─────────────────────────────────────────────────────────
function TabAccount({ toast }) {
  const [showModal, setShowModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  return (
    <div>
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-title">Export Your Data</div>
        <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 16, lineHeight: 1.6 }}>
          Download a copy of all your trips, itineraries, notes, and account data in JSON or CSV format.
        </p>
        <div className="flex gap-10">
          <button className="btn btn-ghost" onClick={() => toast("Preparing JSON export…")}>Export as JSON</button>
          <button className="btn btn-ghost" onClick={() => toast("Preparing CSV export…")}>Export as CSV</button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-title">Deactivate Account</div>
        <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 16, lineHeight: 1.6 }}>
          Temporarily disable your account. Your data will be preserved and you can reactivate at any time by signing back in.
        </p>
        <button className="btn btn-ghost" onClick={() => toast("Account deactivated. Signing out…")}>Deactivate Account</button>
      </div>

      <div className="danger-zone">
        <div className="danger-title">⚠️ Delete Account</div>
        <div className="danger-desc">
          Permanently delete your account and all associated data — trips, itineraries, notes, and preferences. This action is irreversible and cannot be undone.
        </div>
        <button className="btn btn-danger" onClick={() => setShowModal(true)}>Delete My Account</button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Delete Account?</div>
            <div className="modal-desc">
              This will permanently erase all your data. Type <strong>DELETE</strong> below to confirm.
            </div>
            <input className="form-input" placeholder="Type DELETE to confirm" value={confirmText} onChange={e => setConfirmText(e.target.value)} style={{ marginBottom: 20 }} />
            <div className="flex gap-10">
              <button className="btn btn-danger" style={{ flex: 1, justifyContent: "center" }} onClick={() => { if (confirmText === "DELETE") { setShowModal(false); toast("Account deleted. Goodbye 👋"); } }}>
                Confirm Delete
              </button>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("personal");
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const TABS = [
    { id: "personal", label: "Personal Info" },
    { id: "security", label: "Security" },
    { id: "notifications", label: "Notifications" },
    { id: "preferences", label: "Preferences" },
    { id: "account", label: "Account" },
  ];

  const SIDE_NAV = [
    { icon: "✏️", label: "Personal Info", tab: "personal" },
    { icon: "🔒", label: "Security", tab: "security" },
    { icon: "🔔", label: "Notifications", tab: "notifications" },
    { icon: "⚙️", label: "Preferences", tab: "preferences" },
    { divider: true },
    { icon: "❓", label: "Help & Support", tab: null },
    { icon: "📋", label: "Privacy Policy", tab: null },
    { divider: true },
    { icon: "🚪", label: "Sign Out", tab: null, danger: true },
    { icon: "🗑️", label: "Delete Account", tab: "account", danger: true },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="page">
        {/* Header */}
        <div className="page-head">
          <div className="page-title">Profile & Settings</div>
          <div className="page-sub">Manage your account, privacy, and preferences.</div>
        </div>

        {/* Tabs (mobile-friendly top bar) */}
        <div className="tabs">
          {TABS.map(t => (
            <button key={t.id} className={`tab${activeTab === t.id ? " active" : ""}`} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Layout */}
        <div className="layout">
          {/* Left sidebar */}
          <div>
            <div className="card">
              <div className="avatar-wrap">
                <div className="avatar">AJ</div>
                <div className="avatar-name">Aditya </div>
                <div className="avatar-email">alex@email.com</div>
                <div className="avatar-edit">Change photo</div>
              </div>

              {/* Stats */}
              <div className="stat-row">
                <div className="stat-mini">
                  <div className="stat-mini-val">3</div>
                  <div className="stat-mini-label">Trips</div>
                </div>
                <div className="stat-mini">
                  <div className="stat-mini-val">8</div>
                  <div className="stat-mini-label">Countries</div>
                </div>
                <div className="stat-mini">
                  <div className="stat-mini-val">49</div>
                  <div className="stat-mini-label">Days</div>
                </div>
              </div>

              <div className="side-nav">
                {SIDE_NAV.map((item, i) =>
                  item.divider ? (
                    <div className="side-nav-divider" key={i} />
                  ) : (
                    <button
                      key={i}
                      className={`side-nav-item${item.danger ? " danger" : ""}${activeTab === item.tab ? " active" : ""}`}
                      style={activeTab === item.tab && !item.danger ? { background: C.cream, color: C.primaryDark, fontWeight: 600 } : {}}
                      onClick={() => item.tab && setActiveTab(item.tab)}
                    >
                      <span className="side-nav-icon">{item.icon}</span>
                      {item.label}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right content */}
          <div>
            {activeTab === "personal" && <TabPersonal toast={showToast} />}
            {activeTab === "security" && <TabSecurity toast={showToast} />}
            {activeTab === "notifications" && <TabNotifications toast={showToast} />}
            {activeTab === "preferences" && <TabPreferences toast={showToast} />}
            {activeTab === "account" && <TabAccount toast={showToast} />}
          </div>
        </div>
      </div>

      {toastMsg && <div className="toast">✓ {toastMsg}</div>}
    </>
  );
}
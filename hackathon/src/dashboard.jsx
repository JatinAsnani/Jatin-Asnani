import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Design tokens ──────────────────────────────────────────────
const T = {
    cream: "#FFEAD3",
    deepRed: "#9E3B3B",
    midRed: "#D25353",
    lightRed: "#EA7B7B",
    white: "#FFFFFF",
    offWhite: "#FFF5F0",
    textPri: "#3A1A1A",
    textSec: "#7A3A3A",
    textMute: "#B07070",
    border: "#F0C8B0",
    borderStrong: "#D25353",
    shadow: "rgba(158,59,59,0.10)",
    shadowSt: "rgba(158,59,59,0.20)",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: ${T.cream};
    color: ${T.textPri};
    min-height: 100vh;
  }

  /* ── Sidebar ── */
  .sidebar {
    position: fixed; top: 0; left: 0; height: 100vh; width: 240px;
    background: ${T.white};
    border-right: 1.5px solid ${T.border};
    box-shadow: 4px 0 24px ${T.shadow};
    display: flex; flex-direction: column;
    padding: 28px 0 20px;
    z-index: 100;
    transition: transform 0.3s ease;
  }
  .logo {
    font-family: 'Lora', serif;
    font-size: 22px; font-weight: 700;
    color: ${T.deepRed};
    padding: 0 24px 28px;
    border-bottom: 1.5px solid ${T.border};
    letter-spacing: -0.01em;
  }
  .logo span { color: ${T.midRed}; }
  .nav-section { padding: 20px 12px 0; flex: 1; overflow-y: auto; }
  .nav-label {
    font-size: 10px; font-weight: 600; letter-spacing: 0.15em;
    color: ${T.textMute}; text-transform: uppercase;
    padding: 0 12px 8px;
  }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: 10px; cursor: pointer;
    font-size: 14px; font-weight: 500; color: ${T.textSec};
    transition: all 0.18s ease; margin-bottom: 2px;
    border: none; background: none; width: 100%; text-align: left;
  }
  .nav-item:hover { background: ${T.offWhite}; color: ${T.deepRed}; }
  .nav-item.active { background: ${T.cream}; color: ${T.deepRed}; font-weight: 600; }
  .nav-icon { font-size: 16px; width: 20px; text-align: center; }
  .sidebar-bottom {
    padding: 16px 12px;
    border-top: 1.5px solid ${T.border};
  }
  .user-chip {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: 10px;
    cursor: pointer; transition: all 0.18s ease;
  }
  .user-chip:hover { background: ${T.offWhite}; }
  .avatar {
    width: 36px; height: 36px; border-radius: 9999px;
    background: ${T.deepRed}; color: ${T.cream};
    font-size: 13px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .user-info { display: flex; flex-direction: column; min-width: 0; }
  .user-name { font-size: 13px; font-weight: 600; color: ${T.textPri}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .user-email { font-size: 11px; color: ${T.textMute}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  /* ── Main ── */
  .main {
    margin-left: 240px;
    min-height: 100vh;
    background: ${T.cream};
    padding: 32px 36px;
  }

  /* ── Top bar ── */
  .topbar {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 32px;
  }
  .greeting h1 {
    font-family: 'Lora', serif;
    font-size: 28px; font-weight: 700;
    color: ${T.deepRed}; letter-spacing: -0.02em; line-height: 1.15;
  }
  .greeting p { font-size: 14px; color: ${T.textSec}; margin-top: 4px; font-weight: 300; }
  .topbar-actions { display: flex; gap: 10px; align-items: center; }

  /* ── Buttons ── */
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 10px 22px; border-radius: 9999px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500; letter-spacing: 0.02em;
    cursor: pointer; border: 2px solid transparent;
    transition: all 0.18s ease; text-decoration: none;
    white-space: nowrap;
  }
  .btn:active { transform: scale(0.97); }
  .btn-primary {
    background: ${T.deepRed}; color: ${T.cream}; border-color: ${T.deepRed};
  }
  .btn-primary:hover { background: ${T.cream}; color: ${T.deepRed}; border-color: ${T.deepRed}; }
  .btn-ghost {
    background: ${T.white}; color: ${T.deepRed}; border-color: ${T.border};
  }
  .btn-ghost:hover { background: ${T.cream}; border-color: ${T.deepRed}; }
  .btn-sm { padding: 6px 14px; font-size: 12px; }

  /* ── Stat cards row ── */
  .stats-row {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
    margin-bottom: 28px;
  }
  .stat-card {
    background: ${T.white}; border: 1.5px solid ${T.border};
    border-radius: 16px; padding: 18px 20px;
    box-shadow: 0 2px 12px ${T.shadow};
    transition: all 0.25s ease; cursor: default;
  }
  .stat-card:hover {
    border-color: ${T.midRed};
    box-shadow: 0 6px 24px ${T.shadowSt};
    transform: translateY(-4px);
  }
  .stat-label { font-size: 11px; font-weight: 600; color: ${T.textMute}; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px; }
  .stat-value { font-family: 'Lora', serif; font-size: 28px; font-weight: 700; color: ${T.deepRed}; line-height: 1; }
  .stat-sub { font-size: 12px; color: ${T.textSec}; margin-top: 4px; }
  .stat-icon { font-size: 20px; margin-bottom: 10px; }

  /* ── Section header ── */
  .section-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }
  .section-title {
    font-family: 'Lora', serif;
    font-size: 20px; font-weight: 700;
    color: ${T.deepRed}; letter-spacing: -0.01em;
  }

  /* ── Recent trips ── */
  .trips-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
    margin-bottom: 32px;
  }
  .trip-card {
    background: ${T.white}; border: 1.5px solid ${T.border};
    border-radius: 16px; overflow: hidden;
    box-shadow: 0 2px 12px ${T.shadow};
    transition: all 0.25s ease; cursor: pointer;
  }
  .trip-card:hover { border-color: ${T.midRed}; box-shadow: 0 6px 24px ${T.shadowSt}; transform: translateY(-4px); }
  .trip-img {
    height: 140px; overflow: hidden; position: relative;
  }
  .trip-img-inner {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.35s ease, filter 0.35s ease;
    display: flex; align-items: center; justify-content: center;
    font-size: 48px;
  }
  .trip-card:hover .trip-img-inner { transform: scale(1.04); filter: brightness(0.95); }
  .trip-img-overlay {
    position: absolute; inset: 0;
    background: rgba(158,59,59,0);
    transition: background 0.35s ease;
  }
  .trip-card:hover .trip-img-overlay { background: rgba(158,59,59,0.08); }
  .trip-status {
    position: absolute; top: 10px; right: 10px;
    font-size: 10px; font-weight: 600; letter-spacing: 0.05em;
    padding: 3px 10px; border-radius: 9999px;
  }
  .status-active   { background: #D4F0D4; color: #2A6A2A; }
  .status-upcoming { background: #FFF3CC; color: #7A5A00; }
  .status-past     { background: ${T.offWhite}; color: ${T.textMute}; }
  .trip-body { padding: 14px 16px; }
  .trip-eyebrow { font-size: 10px; font-weight: 600; color: ${T.lightRed}; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 4px; }
  .trip-title { font-family: 'Lora', serif; font-size: 15px; font-weight: 600; color: ${T.deepRed}; margin-bottom: 4px; }
  .trip-meta { font-size: 12px; color: ${T.textMute}; display: flex; gap: 12px; margin-bottom: 12px; }
  .trip-footer { display: flex; justify-content: space-between; align-items: center; }
  .trip-budget { font-size: 12px; color: ${T.textSec}; }
  .trip-budget strong { color: ${T.deepRed}; font-weight: 600; }

  /* ── Budget highlight card ── */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
  .budget-card {
    background: ${T.deepRed}; border-radius: 16px; padding: 24px;
    box-shadow: 0 6px 24px ${T.shadowSt};
    color: ${T.cream};
  }
  .budget-title { font-family: 'Lora', serif; font-size: 17px; font-weight: 700; margin-bottom: 4px; }
  .budget-sub { font-size: 13px; color: rgba(255,234,211,0.7); margin-bottom: 20px; }
  .budget-amount { font-family: 'Lora', serif; font-size: 36px; font-weight: 700; line-height: 1; margin-bottom: 6px; }
  .budget-spent { font-size: 13px; color: rgba(255,234,211,0.75); margin-bottom: 20px; }
  .budget-bar-bg { height: 8px; background: rgba(255,234,211,0.2); border-radius: 9999px; overflow: hidden; margin-bottom: 6px; }
  .budget-bar-fill { height: 100%; border-radius: 9999px; background: ${T.cream}; transition: width 1s ease; }
  .budget-bar-label { font-size: 11px; color: rgba(255,234,211,0.7); display: flex; justify-content: space-between; }
  .budget-breakdown { margin-top: 18px; display: flex; flex-direction: column; gap: 8px; }
  .bkd-row { display: flex; align-items: center; justify-content: space-between; font-size: 12px; }
  .bkd-dot { width: 8px; height: 8px; border-radius: 50%; margin-right: 8px; flex-shrink: 0; }
  .bkd-label { display: flex; align-items: center; color: rgba(255,234,211,0.85); }
  .bkd-val { color: ${T.cream}; font-weight: 600; }

  /* ── Quick actions card ── */
  .quick-card {
    background: ${T.white}; border: 1.5px solid ${T.border};
    border-radius: 16px; padding: 24px;
    box-shadow: 0 2px 12px ${T.shadow};
  }
  .quick-title { font-family: 'Lora', serif; font-size: 17px; font-weight: 700; color: ${T.deepRed}; margin-bottom: 4px; }
  .quick-sub { font-size: 13px; color: ${T.textMute}; margin-bottom: 20px; }
  .quick-actions { display: flex; flex-direction: column; gap: 10px; }
  .quick-action-btn {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px; border-radius: 10px;
    border: 1.5px solid ${T.border};
    background: ${T.offWhite}; cursor: pointer;
    transition: all 0.18s ease; text-align: left;
  }
  .quick-action-btn:hover { border-color: ${T.midRed}; background: ${T.cream}; transform: translateX(4px); }
  .qa-icon { font-size: 20px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 9px; background: ${T.cream}; flex-shrink: 0; }
  .qa-text-block { display: flex; flex-direction: column; }
  .qa-label { font-size: 13px; font-weight: 600; color: ${T.deepRed}; }
  .qa-desc { font-size: 11px; color: ${T.textMute}; margin-top: 1px; }

  /* ── Recommended destinations ── */
  .reco-row {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
    margin-bottom: 32px;
  }
  .reco-card {
    background: ${T.white}; border: 1.5px solid ${T.border};
    border-radius: 14px; overflow: hidden;
    box-shadow: 0 2px 8px ${T.shadow};
    cursor: pointer; transition: all 0.25s ease;
  }
  .reco-card:hover { border-color: ${T.midRed}; box-shadow: 0 6px 20px ${T.shadowSt}; transform: translateY(-4px); }
  .reco-thumb {
    height: 90px; display: flex; align-items: center; justify-content: center;
    font-size: 40px; overflow: hidden; position: relative;
    transition: transform 0.35s ease;
  }
  .reco-card:hover .reco-thumb { transform: scale(1.06); }
  .reco-body { padding: 10px 12px 12px; }
  .reco-city { font-family: 'Lora', serif; font-size: 13px; font-weight: 600; color: ${T.deepRed}; margin-bottom: 2px; }
  .reco-country { font-size: 11px; color: ${T.textMute}; margin-bottom: 8px; }
  .reco-tags { display: flex; gap: 4px; flex-wrap: wrap; }
  .tag {
    font-size: 10px; font-weight: 500; padding: 2px 8px;
    border-radius: 9999px; background: ${T.cream}; color: ${T.deepRed};
    border: 1px solid ${T.lightRed}; letter-spacing: 0.04em;
    transition: all 0.15s ease; cursor: default;
  }
  .tag:hover { background: ${T.lightRed}; color: ${T.white}; border-color: ${T.lightRed}; }

  /* ── Notifications badge ── */
  .notif-btn {
    position: relative; background: ${T.white}; border: 1.5px solid ${T.border};
    border-radius: 9999px; width: 40px; height: 40px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 18px; transition: all 0.18s ease;
  }
  .notif-btn:hover { border-color: ${T.midRed}; background: ${T.cream}; }
  .notif-dot {
    position: absolute; top: 6px; right: 6px;
    width: 8px; height: 8px; border-radius: 50%;
    background: ${T.midRed}; border: 2px solid ${T.white};
  }

  /* ── Search bar ── */
  .search-wrap {
    position: relative; display: flex; align-items: center;
  }
  .search-icon { position: absolute; left: 12px; color: ${T.textMute}; font-size: 15px; pointer-events: none; }
  .search-input {
    padding: 9px 14px 9px 36px;
    border: 1.5px solid ${T.border}; border-radius: 9999px;
    background: ${T.white}; font-family: 'DM Sans', sans-serif;
    font-size: 13px; color: ${T.textPri};
    width: 220px; outline: none;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
  }
  .search-input::placeholder { color: ${T.textMute}; }
  .search-input:focus { border-color: ${T.borderStrong}; box-shadow: 0 0 0 3px rgba(210,83,83,0.12); }

  /* ── Responsive ── */
  @media (max-width: 1100px) {
    .stats-row { grid-template-columns: repeat(2, 1fr); }
    .trips-grid { grid-template-columns: repeat(2, 1fr); }
    .reco-row   { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); }
    .main { margin-left: 0; padding: 20px 16px; }
    .two-col { grid-template-columns: 1fr; }
    .stats-row { grid-template-columns: repeat(2, 1fr); }
    .trips-grid { grid-template-columns: 1fr; }
  }
`;

// ── Data ─────────────────────────────────────────────────────────
const recentTrips = [
    {
        id: 1, emoji: "🏝️", country: "Indonesia",
        title: "Bali Cultural Escape", dates: "Jun 12 – Jun 22", days: "10 days",
        status: "upcoming", statusLabel: "Upcoming", budget: "₹85,000", spent: "₹12,400",
    },
    {
        id: 2, emoji: "🗼", country: "France",
        title: "Paris in Spring", dates: "Apr 3 – Apr 10", days: "7 days",
        status: "past", statusLabel: "Completed", budget: "₹1,20,000", spent: "₹1,18,500",
    },
    {
        id: 3, emoji: "🏔️", country: "Nepal",
        title: "Himalayan Trek", dates: "Jul 1 – Jul 15", days: "14 days",
        status: "active", statusLabel: "Planning", budget: "₹60,000", spent: "₹8,200",
    },
];

const recommended = [
    { city: "Kyoto", country: "Japan", emoji: "⛩️", tags: ["Culture", "Food"] },
    { city: "Santorini", country: "Greece", emoji: "🌊", tags: ["Beach", "Luxury"] },
    { city: "Queenstown", country: "NZ", emoji: "🏔️", tags: ["Adventure"] },
    { city: "Marrakech", country: "Morocco", emoji: "🕌", tags: ["Culture", "Food"] },
];

const quickActions = [
    { icon: "✈️", label: "Plan New Trip", desc: "Create a new itinerary from scratch" },
    { icon: "📋", label: "My Itineraries", desc: "View and edit all your trip plans" },
    { icon: "🎒", label: "Packing Checklist", desc: "Manage your packing lists" },
    { icon: "💰", label: "Budget Overview", desc: "Track spending across all trips" },
];

const navItems = [
    { icon: "🏠", label: "Dashboard", active: true },
    { icon: "🗺️", label: "My Trips", active: false },
    { icon: "🔍", label: "Explore", active: false },
    { icon: "📅", label: "Itinerary", active: false },
    { icon: "💰", label: "Budget", active: false },
    { icon: "🎒", label: "Packing", active: false },
    { icon: "📝", label: "Journal", active: false },
    { icon: "⚙️", label: "Settings", active: false },
];

const budgetBreakdown = [
    { label: "Accommodation", pct: 38, color: T.cream, val: "₹32,300" },
    { label: "Flights", pct: 30, color: T.lightRed, val: "₹25,500" },
    { label: "Food", pct: 18, color: T.midRed, val: "₹15,300" },
    { label: "Activities", pct: 14, color: "#F5C0C0", val: "₹11,900" },
];

// ── Component ─────────────────────────────────────────────────
export default function TraveloopDashboard() {
    const [activeNav, setActiveNav] = useState("Dashboard");
    const navigate = useNavigate();

    return (
        <>
            <style>{styles}</style>

            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo">Travel<span>oop</span></div>

                <nav className="nav-section">
                    <div className="nav-label">Menu</div>
                    {navItems.map(({ icon, label }) => (
                        <button
                            key={label}
                            className={`nav-item ${activeNav === label ? "active" : ""}`}
                            onClick={() => setActiveNav(label)}
                        >
                            <span className="nav-icon">{icon}</span>
                            {label}
                        </button>
                    ))}
                </nav>

                <div className="sidebar-bottom">
                    <div className="user-chip">
                        <div className="avatar">AK</div>
                        <div className="user-info">
                            <span className="user-name">Ayaan / Kraken</span>
                            <span className="user-email">ayaan@traveloop.io</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="main">

                {/* Top bar */}
                <div className="topbar">
                    <div className="greeting">
                        <h1>Good morning, Ayaan ✈️</h1>
                        <p>You have 3 trips in progress — let's keep exploring.</p>
                    </div>
                    <div className="topbar-actions">
                        <div className="search-wrap">
                            <span className="search-icon">🔍</span>
                            <input className="search-input" placeholder="Search destinations…" />
                        </div>
                        <div className="notif-btn" title="Notifications">
                            🔔
                            <span className="notif-dot" />
                        </div>
                        <button className="btn btn-primary" onClick={() => navigate('/plan-trip')}>+ Plan New Trip</button>
                    </div>
                </div>

                {/* Stats row */}
                <div className="stats-row">
                    {[
                        { icon: "🗺️", label: "Total Trips", value: "8", sub: "3 active" },
                        { icon: "🌍", label: "Countries Visited", value: "12", sub: "+2 this year" },
                        { icon: "💸", label: "Total Spent", value: "₹4.2L", sub: "Across all trips" },
                        { icon: "📅", label: "Days Travelled", value: "94", sub: "Since 2022" },
                    ].map(({ icon, label, value, sub }) => (
                        <div className="stat-card" key={label}>
                            <div className="stat-icon">{icon}</div>
                            <div className="stat-label">{label}</div>
                            <div className="stat-value">{value}</div>
                            <div className="stat-sub">{sub}</div>
                        </div>
                    ))}
                </div>

                {/* Recent trips */}
                <div className="section-header">
                    <span className="section-title">Recent Trips</span>
                    <button className="btn btn-ghost btn-sm">View All →</button>
                </div>
                <div className="trips-grid">
                    {recentTrips.map((t) => (
                        <div className="trip-card" key={t.id}>
                            <div className="trip-img">
                                <div
                                    className="trip-img-inner"
                                    style={{
                                        background:
                                            t.status === "upcoming" ? "#FFF5F0" :
                                                t.status === "active" ? "#FDE8E0" : "#F8F0EC",
                                    }}
                                >
                                    {t.emoji}
                                </div>
                                <div className="trip-img-overlay" />
                                <span className={`trip-status status-${t.status}`}>{t.statusLabel}</span>
                            </div>
                            <div className="trip-body">
                                <div className="trip-eyebrow">{t.country}</div>
                                <div className="trip-title">{t.title}</div>
                                <div className="trip-meta">
                                    <span>📅 {t.dates}</span>
                                    <span>⏱ {t.days}</span>
                                </div>
                                <div className="trip-footer">
                                    <div className="trip-budget">
                                        Spent <strong>{t.spent}</strong> of {t.budget}
                                    </div>
                                    <button className="btn btn-ghost btn-sm">View →</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Budget + Quick actions */}
                <div className="two-col">
                    {/* Budget card */}
                    <div className="budget-card">
                        <div className="budget-title">Budget Overview</div>
                        <div className="budget-sub">Bali Cultural Escape · Jun 2025</div>
                        <div className="budget-amount">₹85,000</div>
                        <div className="budget-spent">₹12,400 spent so far</div>
                        <div className="budget-bar-bg">
                            <div className="budget-bar-fill" style={{ width: "14.6%" }} />
                        </div>
                        <div className="budget-bar-label">
                            <span>14.6% used</span><span>₹72,600 remaining</span>
                        </div>
                        <div className="budget-breakdown">
                            {budgetBreakdown.map(({ label, pct, color, val }) => (
                                <div className="bkd-row" key={label}>
                                    <div className="bkd-label">
                                        <span className="bkd-dot" style={{ background: color }} />
                                        {label} ({pct}%)
                                    </div>
                                    <span className="bkd-val">{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="quick-card">
                        <div className="quick-title">Quick Actions</div>
                        <div className="quick-sub">Jump right into your next step</div>
                        <div className="quick-actions">
                            {quickActions.map(({ icon, label, desc }) => (
                                <button
                                    className="quick-action-btn"
                                    key={label}
                                    onClick={label === "Plan New Trip" ? () => navigate('/plan-trip') : undefined}
                                >
                                    <div className="qa-icon">{icon}</div>
                                    <div className="qa-text-block">
                                        <span className="qa-label">{label}</span>
                                        <span className="qa-desc">{desc}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recommended destinations */}
                <div className="section-header">
                    <span className="section-title">Recommended for You</span>
                    <button className="btn btn-ghost btn-sm">Explore All →</button>
                </div>
                <div className="reco-row">
                    {recommended.map(({ city, country, emoji, tags }) => (
                        <div className="reco-card" key={city}>
                            <div
                                className="reco-thumb"
                                style={{ background: T.offWhite }}
                            >
                                {emoji}
                            </div>
                            <div className="reco-body">
                                <div className="reco-city">{city}</div>
                                <div className="reco-country">{country}</div>
                                <div className="reco-tags">
                                    {tags.map((tag) => (
                                        <span className="tag" key={tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </main>
        </>
    );
}
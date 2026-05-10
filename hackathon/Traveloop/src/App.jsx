import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import MyTrips from './pages/MyTrips';
import ItineraryBuilder from './pages/ItineraryBuilder';
import BudgetDashboard from './pages/BudgetDashboard';
import Explore from './pages/Explore';
import PackingList from './pages/PackingList';
import TravelJournal from './pages/TravelJournal';
import CalendarView from './pages/CalendarView';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="w-full min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateTrip />} />
        <Route path="/trips" element={<MyTrips />} />
        <Route path="/itinerary/:id" element={<ItineraryBuilder />} />
        <Route path="/budget" element={<BudgetDashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/packing" element={<PackingList />} />
        <Route path="/journal" element={<TravelJournal />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TraveloopDashboard from './dashboard';
import CreateTripPage from './CreateTripPage';
import ProfileSettings from './ProfileSettings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TraveloopDashboard />} />
        <Route path="/plan-trip" element={<CreateTripPage />} />
        <Route path="/profile" element={<ProfileSettings />} />
      </Routes>
    </BrowserRouter>
  );
}
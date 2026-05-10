import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Map, Calendar as CalendarIcon, DollarSign, Settings, LogOut, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

const CalendarView = () => {
  const navigate = useNavigate();
  const trips = useStore(state => state.trips);
  const setActiveTrip = useStore(state => state.setActiveTrip);

  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOffset = getFirstDayOfMonth(currentYear, currentMonth);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingDays = Array.from({ length: firstDayOffset }, (_, i) => i);

  const prevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));

  // Helper to check if a day has a trip
  const getTripsForDay = (day) => {
    const dateToCheck = new Date(currentYear, currentMonth, day);
    dateToCheck.setHours(0, 0, 0, 0);

    return trips.filter(trip => {
      // Check original trip.startDate and trip.endDate if available
      // Since trip data might have them if added after fixing form
      if (trip.startDate && trip.endDate) {
        const start = new Date(trip.startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(trip.endDate);
        end.setHours(23, 59, 59, 999);
        return dateToCheck >= start && dateToCheck <= end;
      }
      return false;
    });
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/5 flex flex-col justify-between hidden md:flex z-20">
        <div className="p-6">
          <div className="text-2xl font-bold tracking-tight text-[#EA7B7B] mb-10 cursor-pointer" onClick={() => navigate('/')}>
            Traveloop<span className="text-[#FFEAD3]">.</span>
          </div>
          <nav className="space-y-2">
            {[
              { id: 'overview', icon: <Home className="w-5 h-5" />, label: 'Profile', route: '/dashboard' },
              { id: 'explore', icon: <Compass className="w-5 h-5" />, label: 'Explore', route: '/explore' },
              { id: 'trips', icon: <Map className="w-5 h-5" />, label: 'My Trips', route: '/trips' },
              { id: 'calendar', icon: <CalendarIcon className="w-5 h-5" />, label: 'Calendar', route: '/calendar' },
              { id: 'budget', icon: <DollarSign className="w-5 h-5" />, label: 'Budget', route: '/budget' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.route)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${item.id === 'calendar'
                    ? 'bg-[#EA7B7B]/10 text-[#EA7B7B]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 border-t border-white/5">
          <button onClick={() => navigate('/settings')} className="w-full flex items-center space-x-3 px-4 py-3 text-white/60 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
          <button onClick={() => navigate('/')} className="w-full flex items-center space-x-3 px-4 py-3 text-[#EA7B7B] hover:text-[#D25353] transition-colors mt-2">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 md:p-12">
        <div className="max-w-5xl mx-auto">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Calendar</h1>
              <p className="text-white/60">View and manage your upcoming travel schedule.</p>
            </div>

            <div className="flex items-center space-x-4 bg-white/5 p-2 rounded-xl">
              <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5" /></button>
              <div className="font-semibold px-4 w-40 text-center">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
              <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="glass-card rounded-3xl overflow-hidden border border-white/10">
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 border-b border-white/10 bg-white/5">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-4 text-center text-sm font-semibold text-white/60">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 auto-rows-[120px]">
              {paddingDays.map(i => (
                <div key={`empty-${i}`} className="border-r border-b border-white/5 bg-black/20 p-2"></div>
              ))}

              {days.map(day => {
                const dayTrips = getTripsForDay(day);
                return (
                  <div key={day} className="border-r border-b border-white/5 p-2 hover:bg-white/5 transition-colors relative group">
                    <span className={`text-sm font-medium ${day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()
                        ? 'bg-[#EA7B7B] text-white w-6 h-6 rounded-full flex items-center justify-center'
                        : 'text-white/60'
                      }`}>
                      {day}
                    </span>

                    <div className="mt-2 space-y-1">
                      {dayTrips.map(trip => (
                        <div
                          key={trip.id}
                          onClick={() => {
                            setActiveTrip(trip.id);
                            navigate(`/itinerary/${trip.id}`);
                          }}
                          className={`text-xs px-2 py-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity bg-[#EA7B7B]/20 text-[#EA7B7B] border border-[#EA7B7B]/30`}
                        >
                          {trip.destination.split(',')[0]}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CalendarView;

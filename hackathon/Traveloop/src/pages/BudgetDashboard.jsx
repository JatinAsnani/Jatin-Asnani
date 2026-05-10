import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ArrowLeft, Home, Map, Calendar, DollarSign, Settings, LogOut, TrendingUp, CreditCard, Plane, Coffee, Home as HotelIcon, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

const BudgetDashboard = () => {
  const navigate = useNavigate();

  const trips = useStore(state => state.trips);
  const activeTripId = useStore(state => state.activeTripId);
  const trip = trips.find(t => t.id === activeTripId) || trips[0];
  const expensesData = trip?.expenses || [];
  const totalBudget = trip?.budget || 0;

  // Aggregate expenses by category
  const expensesByCategory = expensesData.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.value;
    return acc;
  }, {});

  const expenses = [
    { name: 'Transport', value: expensesByCategory['Transport'] || 0, color: '#EA7B7B', icon: <Plane className="w-5 h-5" /> },
    { name: 'Accommodation', value: expensesByCategory['Accommodation'] || 0, color: '#9E3B3B', icon: <HotelIcon className="w-5 h-5" /> },
    { name: 'Food', value: expensesByCategory['Food'] || 0, color: '#D25353', icon: <Coffee className="w-5 h-5" /> },
    { name: 'Activities', value: expensesByCategory['Activities'] || 0, color: '#FFEAD3', icon: <Map className="w-5 h-5" /> },
    { name: 'Misc', value: expensesByCategory['Misc'] || 0, color: '#4B5563', icon: <CreditCard className="w-5 h-5" /> },
  ].filter(e => e.value > 0); // Only show categories with spending

  // Fallback for empty state so pie chart doesn't break
  const displayExpenses = expenses.length > 0 ? expenses : [{ name: 'No Spending', value: 1, color: '#2a2a2a', icon: <AlertCircle /> }];

  // Aggregate by day
  const dailySpendMap = expensesData.reduce((acc, curr) => {
    acc[curr.date] = (acc[curr.date] || 0) + curr.value;
    return acc;
  }, {});
  
  const dailySpend = Object.keys(dailySpendMap).map(day => ({
    day, spend: dailySpendMap[day]
  }));

  const totalSpent = expensesData.reduce((sum, item) => sum + item.value, 0);
  const remaining = totalBudget - totalSpent;
  const spentPercentage = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

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
              { id: 'trips', icon: <Map className="w-5 h-5" />, label: 'My Trips', route: '/trips' },
              { id: 'calendar', icon: <Calendar className="w-5 h-5" />, label: 'Calendar', route: '/calendar' },
              { id: 'budget', icon: <DollarSign className="w-5 h-5" />, label: 'Budget', route: '/budget' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { if (item.route !== '#') navigate(item.route); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  item.id === 'budget'
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
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 md:p-12 relative">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-bold mb-2"
              >
                Budget Analytics
              </motion.h1>
              <p className="text-white/60">{trip?.title} • {trip?.dates}</p>
            </div>
            <button className="px-6 py-2.5 glass rounded-full font-medium hover:bg-white/10 transition-colors flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" /> Export Report
            </button>
          </div>

          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#EA7B7B]"></div>
              <div className="text-white/50 text-sm mb-1">Total Budget</div>
              <div className="text-3xl font-bold">${totalBudget.toLocaleString()}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#D25353]"></div>
              <div className="text-white/50 text-sm mb-1">Total Spent</div>
              <div className="text-3xl font-bold">${totalSpent.toLocaleString()}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
              <div className="text-white/50 text-sm mb-1">Remaining</div>
              <div className="text-3xl font-bold text-[#FFEAD3]">${remaining.toLocaleString()}</div>
              
              {/* Mini progress bar */}
              <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#EA7B7B] to-[#FFEAD3]" style={{ width: `${spentPercentage}%` }}></div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Pie Chart Section */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6 rounded-3xl">
              <h3 className="text-xl font-bold mb-6">Expense Breakdown</h3>
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="w-full sm:w-1/2 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={displayExpenses}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {displayExpenses.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="w-full sm:w-1/2 space-y-4">
                  {expenses.map((expense) => (
                    <div key={expense.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${expense.color}20`, color: expense.color }}>
                          {expense.icon}
                        </div>
                        <span className="text-white/80">{expense.name}</span>
                      </div>
                      <span className="font-bold">${expense.value}</span>
                    </div>
                  ))}
                  {expenses.length === 0 && <div className="text-white/50 text-sm">No expenses yet.</div>}
                </div>
              </div>
            </motion.div>

            {/* Bar Chart Section */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6 rounded-3xl">
              <h3 className="text-xl font-bold mb-6">Daily Spending</h3>
              <div className="h-64 w-full">
                {dailySpend.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailySpend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" axisLine={false} tickLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.4)" axisLine={false} tickLine={false} />
                      <Tooltip 
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      />
                      <Bar dataKey="spend" fill="#EA7B7B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-white/50">No daily spending data yet.</div>
                )}
              </div>
            </motion.div>

          </div>

          {/* Recent Transactions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6 rounded-3xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Recent Transactions</h3>
              <button className="text-white/50 text-sm hover:text-white transition-colors">View All</button>
            </div>
            
            <div className="space-y-4">
              {expensesData.map((tx, i) => (
                <div key={i} className="flex justify-between items-center p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#EA7B7B]/10 text-[#EA7B7B] flex items-center justify-center">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold">{tx.name}</div>
                      <div className="text-xs text-white/40">{tx.category} • {tx.date}</div>
                    </div>
                  </div>
                  <div className="font-bold text-[#EA7B7B]">-${tx.value}</div>
                </div>
              ))}
              {expensesData.length === 0 && <div className="text-center py-4 text-white/50">No transactions recorded yet.</div>}
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default BudgetDashboard;

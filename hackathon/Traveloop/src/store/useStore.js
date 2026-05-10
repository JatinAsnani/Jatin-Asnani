import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

export const useStore = create(
  persist(
    (set, get) => ({
      // User State
      user: null,
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),

      // Trips State
      trips: [
        {
          id: '1',
          title: 'Autumn in Kyoto',
          destination: 'Kyoto, Japan',
          dates: 'Oct 12 - Oct 20, 2026',
          budget: 3500,
          style: 'Culture',
          status: 'Upcoming',
          image: 'bg-gradient-to-br from-red-900 to-black',
          color: 'text-red-400',
          days: [
            { id: 1, date: 'Oct 12', label: 'Day 1' },
            { id: 2, date: 'Oct 13', label: 'Day 2' }
          ],
          itinerary: {
            1: [
              { id: 101, time: '09:00 AM', duration: '2h', title: 'Arrive at Kansai Airport', type: 'transit' },
              { id: 102, time: '03:00 PM', duration: '3h', title: 'Fushimi Inari Shrine', type: 'activity' }
            ]
          },
          expenses: [
            { id: 1, name: 'Flights', value: 1200, category: 'Transport', date: 'Oct 12' },
            { id: 2, name: 'Hotel', value: 1500, category: 'Accommodation', date: 'Oct 12' }
          ],
          packingList: [
            { id: 1, text: 'Passport', category: 'Documents', completed: false }
          ],
          journal: []
        }
      ],
      activeTripId: '1',
      setActiveTrip: (id) => set({ activeTripId: id }),

      activeDayId: 1,
      setActiveDayId: (id) => set({ activeDayId: id }),

      addTrip: (tripData) => set((state) => {
        let datesString = 'TBD';
        let generatedDays = [{ id: 1, date: 'Day 1', label: 'Day 1' }];
        let initialItinerary = { 1: [] };

        if (tripData.startDate && tripData.endDate) {
          const start = new Date(tripData.startDate);
          const end = new Date(tripData.endDate);
          const diffTime = Math.abs(end - start);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end day
          
          datesString = `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
          
          generatedDays = [];
          initialItinerary = {};
          for (let i = 0; i < diffDays; i++) {
            const currentDay = new Date(start);
            currentDay.setDate(start.getDate() + i);
            const id = i + 1;
            generatedDays.push({
              id,
              date: currentDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              label: `Day ${id}`
            });
            initialItinerary[id] = [];
          }
        }

        const newTrip = {
          id: generateId(),
          title: `${tripData.style} in ${tripData.destination.split(',')[0]}`,
          destination: tripData.destination,
          dates: datesString,
          startDate: tripData.startDate,
          endDate: tripData.endDate,
          budget: tripData.budget,
          style: tripData.style,
          status: 'Planning',
          image: 'bg-gradient-to-tr from-cyan-900 to-blue-900',
          color: 'text-blue-400',
          days: generatedDays,
          itinerary: initialItinerary,
          expenses: [],
          packingList: [],
          journal: []
        };
        return { 
          trips: [newTrip, ...state.trips],
          activeTripId: newTrip.id
        };
      }),

      deleteTrip: (id) => set((state) => ({
        trips: state.trips.filter(t => t.id !== id),
        activeTripId: state.activeTripId === id ? (state.trips[0]?.id || null) : state.activeTripId
      })),

      addDayToTrip: () => set((state) => {
        const activeTripIndex = state.trips.findIndex(t => t.id === state.activeTripId);
        if (activeTripIndex === -1) return state;
        
        const trip = state.trips[activeTripIndex];
        const newId = (trip.days[trip.days.length - 1]?.id || 0) + 1;
        
        let newDateStr = `Day ${newId}`;
        if (trip.endDate) {
          const lastDate = new Date(trip.endDate);
          lastDate.setDate(lastDate.getDate() + 1);
          newDateStr = lastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          // Optionally update trip.endDate to be this new date as well
        }

        const newDays = [...trip.days, { id: newId, date: newDateStr, label: `Day ${newId}` }];
        
        const newTrips = [...state.trips];
        newTrips[activeTripIndex] = {
          ...trip,
          days: newDays,
          itinerary: { ...trip.itinerary, [newId]: [] },
          endDate: trip.endDate ? (() => {
            const d = new Date(trip.endDate);
            d.setDate(d.getDate() + 1);
            return d.toISOString().split('T')[0];
          })() : trip.endDate
        };
        
        return { trips: newTrips, activeDayId: newId };
      }),

      // Actions for Active Trip
      addActivityToItinerary: (dayId, activity) => set((state) => {
        const activeTripIndex = state.trips.findIndex(t => t.id === state.activeTripId);
        if (activeTripIndex === -1) return state;
        
        const trip = state.trips[activeTripIndex];
        const dayActivities = trip.itinerary[dayId] || [];
        
        const newTrips = [...state.trips];
        newTrips[activeTripIndex] = {
          ...trip,
          itinerary: {
            ...trip.itinerary,
            [dayId]: [...dayActivities, { ...activity, id: generateId() }]
          }
        };
        return { trips: newTrips };
      }),

      // Add expense
      addExpense: (expense) => set((state) => {
        const activeTripIndex = state.trips.findIndex(t => t.id === state.activeTripId);
        if (activeTripIndex === -1) return state;
        
        const trip = state.trips[activeTripIndex];
        const newTrips = [...state.trips];
        newTrips[activeTripIndex] = {
          ...trip,
          expenses: [{ ...expense, id: generateId() }, ...trip.expenses]
        };
        return { trips: newTrips };
      }),

      // Packing List
      togglePackingItem: (itemId) => set((state) => {
        const activeTripIndex = state.trips.findIndex(t => t.id === state.activeTripId);
        if (activeTripIndex === -1) return state;
        
        const trip = state.trips[activeTripIndex];
        const newTrips = [...state.trips];
        newTrips[activeTripIndex] = {
          ...trip,
          packingList: trip.packingList.map(item => 
            item.id === itemId ? { ...item, completed: !item.completed } : item
          )
        };
        return { trips: newTrips };
      }),

      addPackingItem: (itemData) => set((state) => {
        const activeTripIndex = state.trips.findIndex(t => t.id === state.activeTripId);
        if (activeTripIndex === -1) return state;
        
        const trip = state.trips[activeTripIndex];
        const newTrips = [...state.trips];
        newTrips[activeTripIndex] = {
          ...trip,
          packingList: [{ id: generateId(), ...itemData, completed: false }, ...trip.packingList]
        };
        return { trips: newTrips };
      }),

      deletePackingItem: (itemId) => set((state) => {
        const activeTripIndex = state.trips.findIndex(t => t.id === state.activeTripId);
        if (activeTripIndex === -1) return state;
        
        const trip = state.trips[activeTripIndex];
        const newTrips = [...state.trips];
        newTrips[activeTripIndex] = {
          ...trip,
          packingList: trip.packingList.filter(item => item.id !== itemId)
        };
        return { trips: newTrips };
      }),

      // Journal
      addJournalEntry: (entry) => set((state) => {
        const activeTripIndex = state.trips.findIndex(t => t.id === state.activeTripId);
        if (activeTripIndex === -1) return state;
        
        const trip = state.trips[activeTripIndex];
        const newTrips = [...state.trips];
        newTrips[activeTripIndex] = {
          ...trip,
          journal: [{ id: generateId(), ...entry }, ...trip.journal]
        };
        return { trips: newTrips };
      })

    }),
    {
      name: 'traveloop-storage',
    }
  )
);

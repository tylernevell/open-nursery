export const mockDailyLogs = [
  {
    id: 1,
    babyId: 1,
    date: '2024-02-14',
    feeding: {
      totalCount: 8,
      totalAmount: 720, // ml
      breastCount: 4,
      bottleCount: 4,
      solidCount: 0,
    },
    diapers: {
      wetCount: 6,
      dirtyCount: 2,
      bothCount: 1,
    },
    sleep: {
      totalDuration: 840, // minutes (14 hours)
      longestStretch: 240, // minutes (4 hours)
      napCount: 4,
    },
    events: [
      {
        type: 'feeding',
        timestamp: '2024-02-14T06:00:00Z',
        method: 'breast',
        duration: 20,
        side: 'left',
      },
      {
        type: 'sleep',
        timestamp: '2024-02-14T07:30:00Z',
        duration: 120,
        location: 'crib',
      },
      // More events...
    ],
    notes: 'Good day overall. Started new bedtime routine.',
  },
  {
    id: 2,
    babyId: 1,
    date: '2024-02-13',
    feeding: {
      totalCount: 7,
      totalAmount: 690,
      breastCount: 3,
      bottleCount: 4,
      solidCount: 0,
    },
    diapers: {
      wetCount: 5,
      dirtyCount: 3,
      bothCount: 0,
    },
    sleep: {
      totalDuration: 780,
      longestStretch: 180,
      napCount: 3,
    },
    events: [
      // Events for this day...
    ],
    notes: 'Fussy during afternoon nap.',
  },
];

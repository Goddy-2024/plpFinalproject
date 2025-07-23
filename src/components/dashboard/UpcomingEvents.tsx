import React from 'react';

const UpcomingEvents: React.FC = () => {
  const events = [
    {
      name: 'Youth Conference',
      date: 'Dec 15, 2024',
      status: 'Upcoming',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'Christmas Service',
      date: 'Dec 25, 2024',
      status: 'Confirmed',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      name: 'New Year Service',
      date: 'Jan 1, 2025',
      status: 'Planning',
      statusColor: 'bg-purple-100 text-purple-800'
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
        <p className="text-sm text-gray-600">Scheduled fellowship events</p>
      </div>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{event.name}</p>
              <p className="text-sm text-gray-600">{event.date}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.statusColor}`}>
              {event.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
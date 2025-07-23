import React from 'react';

const TopEvents: React.FC = () => {
  const topEvents = [
    { name: 'Sunday Service', avgAttendance: '120 avg' },
    { name: 'Bible Study', avgAttendance: '85 avg' },
    { name: 'Prayer Meeting', avgAttendance: '67 avg' },
    { name: 'Youth Conference', avgAttendance: '200' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Events</h3>
      </div>
      
      <div className="space-y-4">
        {topEvents.map((event, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-900 font-medium">{event.name}</span>
            <span className="text-gray-600">{event.avgAttendance}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopEvents;
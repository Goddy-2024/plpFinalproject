import React from 'react';

const ActivityList: React.FC = () => {
  const activities = [
    {
      name: 'Sunday Service',
      attendees: 120,
      timeAgo: '2 days ago',
      color: 'blue'
    },
    {
      name: 'Bible Study',
      attendees: 85,
      timeAgo: '5 days ago',
      color: 'green'
    },
    {
      name: 'Prayer Meeting',
      attendees: 67,
      timeAgo: '1 week ago',
      color: 'purple'
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
        <p className="text-sm text-gray-600">Latest fellowship activities</p>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className={`w-3 h-3 rounded-full ${colorClasses[activity.color as keyof typeof colorClasses]}`}></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{activity.name}</p>
              <p className="text-sm text-gray-600">{activity.attendees} attendees</p>
            </div>
            <span className="text-sm text-gray-500">{activity.timeAgo}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
import React from 'react';

const GrowthMetrics: React.FC = () => {
  const metrics = [
    { label: 'Member Growth:', value: '+8.7%', color: 'text-green-600' },
    { label: 'Attendance Growth:', value: '+12.3%', color: 'text-green-600' },
    { label: 'Event Frequency:', value: '2.1/week', color: 'text-blue-600' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Growth Metrics</h3>
      </div>
      
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">{metric.label}</span>
            <span className={`font-bold ${metric.color}`}>{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrowthMetrics;
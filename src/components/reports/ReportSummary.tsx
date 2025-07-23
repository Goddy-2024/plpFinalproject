import React from 'react';

const ReportSummary: React.FC = () => {
  const summaryData = [
    { label: 'Total Events:', value: '8' },
    { label: 'Total Attendance:', value: '624' },
    { label: 'Average per Event:', value: '78' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Monthly Summary</h3>
      </div>
      
      <div className="space-y-4">
        {summaryData.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">{item.label}</span>
            <span className="text-2xl font-bold text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportSummary;
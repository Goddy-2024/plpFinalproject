import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import AttendanceChart from './reports/AttendanceChart';
import DepartmentChart from './reports/DepartmentChart';
import ReportSummary from './reports/ReportSummary';
import TopEvents from './reports/TopEvents';
import GrowthMetrics from './reports/GrowthMetrics';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Current Month');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Generate and view fellowship reports</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Current Month</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AttendanceChart />
        <DepartmentChart />
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ReportSummary />
        <TopEvents />
        <GrowthMetrics />
      </div>
    </div>
  );
};

export default Reports;
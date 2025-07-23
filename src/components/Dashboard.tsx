import React from 'react';
import { Users, Calendar, UserPlus, TrendingUp } from 'lucide-react';
import StatsCard from './dashboard/StatsCard';
import ActivityList from './dashboard/ActivityList';
import UpcomingEvents from './dashboard/UpcomingEvents';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Members',
      value: '145',
      subtitle: 'Active fellowship members',
      icon: Users,
      color: 'blue'
    },
    {
      title: "This Month's Events",
      value: '8',
      subtitle: 'Scheduled activities',
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'New Members',
      value: '12',
      subtitle: 'Joined this month',
      icon: UserPlus,
      color: 'purple'
    },
    {
      title: 'Attendance Rate',
      value: '78%',
      subtitle: 'Average event attendance',
      icon: TrendingUp,
      color: 'orange'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to MMU RHSF Fellowship Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Activity Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <ActivityList />
        <UpcomingEvents />
      </div>
    </div>
  );
};

export default Dashboard;
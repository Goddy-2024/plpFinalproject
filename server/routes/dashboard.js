import express from 'express';
import Member from '../models/Member.js';
import Event from '../models/Event.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get dashboard statistics
router.get('/stats', authenticate, async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const [
      totalMembers,
      thisMonthEvents,
      newMembersThisMonth,
      recentEvents,
      upcomingEvents,
      attendanceData
    ] = await Promise.all([
      // Total active members
      Member.countDocuments({ status: 'Active' }),
      
      // Events this month
      Event.countDocuments({
        date: { $gte: startOfMonth, $lte: now }
      }),
      
      // New members this month
      Member.countDocuments({
        createdAt: { $gte: startOfMonth }
      }),
      
      // Recent events for activity list
      Event.find({
        status: 'Completed',
        date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      })
      .sort({ date: -1 })
      .limit(5)
      .select('name actualAttendees date'),
      
      // Upcoming events
      Event.find({
        date: { $gte: now },
        status: { $in: ['Planning', 'Upcoming'] }
      })
      .sort({ date: 1 })
      .limit(5)
      .select('name date status'),
      
      // Attendance data for rate calculation
      Event.aggregate([
        {
          $match: {
            status: 'Completed',
            date: { $gte: startOfMonth }
          }
        },
        {
          $group: {
            _id: null,
            totalExpected: { $sum: '$expectedAttendees' },
            totalActual: { $sum: '$actualAttendees' }
          }
        }
      ])
    ]);

    // Calculate attendance rate
    const attendanceRate = attendanceData.length > 0 && attendanceData[0].totalExpected > 0
      ? Math.round((attendanceData[0].totalActual / attendanceData[0].totalExpected) * 100)
      : 0;

    res.json({
      stats: {
        totalMembers,
        thisMonthEvents,
        newMembersThisMonth,
        attendanceRate: `${attendanceRate}%`
      },
      recentActivities: recentEvents.map(event => ({
        name: event.name,
        attendees: event.actualAttendees,
        timeAgo: getTimeAgo(event.date)
      })),
      upcomingEvents: upcomingEvents.map(event => ({
        name: event.name,
        date: event.date.toISOString().split('T')[0],
        status: event.status
      }))
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
});

// Get monthly attendance trend
router.get('/attendance-trend', authenticate, async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const attendanceData = await Event.aggregate([
      {
        $match: {
          status: 'Completed',
          date: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          avgAttendance: { $avg: '$actualAttendees' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const formattedData = attendanceData.map(item => ({
      month: monthNames[item._id.month - 1],
      attendance: Math.round(item.avgAttendance)
    }));

    res.json(formattedData);
  } catch (error) {
    console.error('Attendance trend error:', error);
    res.status(500).json({
      message: 'Error fetching attendance trend',
      error: error.message
    });
  }
});

// Helper function to calculate time ago
function getTimeAgo(date) {
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return '1 week ago';
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

export default router;
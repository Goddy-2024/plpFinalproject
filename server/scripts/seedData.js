import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Member from '../models/Member.js';
import Event from '../models/Event.js';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fellowship_management');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Member.deleteMany({});
    await Event.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@rhsf.com',
      password: 'rhsf2024',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Created admin user');

    // Create sample members
    const members = [
      {
        name: 'Godswill Omondi Ajuoga',
        email: 'gaoajuoga@gmail.com',
        phone: '+254740275539',
        department: 'IT & Video',
        joinDate: new Date('2024-08-28'),
        status: 'Active'
      },
      {
        name: 'William Ndiema',
        email: 'william.ndiema@gmail.com',
        phone: '+254700000000',
        department: 'Worship',
        joinDate: new Date('2023-08-28'),
        status: 'Active'
      },
      {
        name: 'Ephraim Muganda',
        email: 'ephraim.muganda@gmail.com',
        phone: '+254700000001',
        department: 'Worship',
        joinDate: new Date('2023-08-28'),
        status: 'Active'
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@gmail.com',
        phone: '+254711000000',
        department: 'Youth',
        joinDate: new Date('2024-01-15'),
        status: 'Active'
      },
      {
        name: 'Michael Brown',
        email: 'michael.brown@gmail.com',
        phone: '+254722000000',
        department: 'Media',
        joinDate: new Date('2023-12-10'),
        status: 'Active'
      },
      {
        name: 'Grace Wanjiku',
        email: 'grace.wanjiku@gmail.com',
        phone: '+254733000000',
        department: 'Ushering',
        joinDate: new Date('2024-02-20'),
        status: 'Active'
      },
      {
        name: 'David Kimani',
        email: 'david.kimani@gmail.com',
        phone: '+254744000000',
        department: 'Prayer',
        joinDate: new Date('2023-11-05'),
        status: 'Active'
      },
      {
        name: 'Mary Achieng',
        email: 'mary.achieng@gmail.com',
        phone: '+254755000000',
        department: 'Outreach',
        joinDate: new Date('2024-03-12'),
        status: 'Active'
      }
    ];

    const createdMembers = await Member.insertMany(members);
    console.log('Created sample members');

    // Create sample events
    const events = [
      {
        name: 'Morning Class Evangelism',
        description: 'Evangelism during morning classes',
        date: new Date('2024-12-15'),
        time: '09:00',
        location: 'Main Hall',
        type: 'Service',
        expectedAttendees: 150,
        actualAttendees: 142,
        status: 'Upcoming',
        organizer: createdMembers[0]._id
      },
      {
        name: 'Weekly Fellowship',
        description: 'Weekly fellowship meeting',
        date: new Date('2024-12-18'),
        time: '19:00',
        location: 'Conference Room',
        type: 'Study',
        expectedAttendees: 80,
        actualAttendees: 0,
        status: 'Upcoming',
        organizer: createdMembers[1]._id
      },
      {
        name: 'Lunch Hour Fellowship',
        description: 'Fellowship during lunch break',
        date: new Date('2024-12-10'),
        time: '14:00',
        location: 'Main Hall',
        type: 'Conference',
        expectedAttendees: 200,
        actualAttendees: 185,
        status: 'Completed',
        organizer: createdMembers[2]._id
      },
      {
        name: 'Youth Conference',
        description: 'Annual youth conference',
        date: new Date('2024-12-20'),
        time: '10:00',
        location: 'Youth Center',
        type: 'Conference',
        expectedAttendees: 120,
        actualAttendees: 0,
        status: 'Upcoming',
        organizer: createdMembers[3]._id
      },
      {
        name: 'Sunday Service',
        description: 'Weekly Sunday service',
        date: new Date('2024-12-08'),
        time: '10:00',
        location: 'Main Hall',
        type: 'Service',
        expectedAttendees: 130,
        actualAttendees: 120,
        status: 'Completed',
        organizer: createdMembers[1]._id
      },
      {
        name: 'Bible Study',
        description: 'Weekly Bible study session',
        date: new Date('2024-12-05'),
        time: '19:00',
        location: 'Conference Room',
        type: 'Study',
        expectedAttendees: 90,
        actualAttendees: 85,
        status: 'Completed',
        organizer: createdMembers[4]._id
      },
      {
        name: 'Prayer Meeting',
        description: 'Weekly prayer meeting',
        date: new Date('2024-12-03'),
        time: '18:00',
        location: 'Prayer Room',
        type: 'Meeting',
        expectedAttendees: 70,
        actualAttendees: 67,
        status: 'Completed',
        organizer: createdMembers[6]._id
      }
    ];

    await Event.insertMany(events);
    console.log('Created sample events');

    console.log('✅ Seed data created successfully!');
    console.log('Admin credentials: admin / rhsf2024');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
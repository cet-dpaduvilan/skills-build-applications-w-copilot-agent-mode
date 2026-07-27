import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Avery Stone',
        email: 'avery.stone@octofit.dev',
        age: 29,
        fitnessLevel: 'intermediate',
        weeklyGoalMinutes: 240,
      },
      {
        name: 'Mina Patel',
        email: 'mina.patel@octofit.dev',
        age: 34,
        fitnessLevel: 'advanced',
        weeklyGoalMinutes: 300,
      },
      {
        name: 'Jordan Reyes',
        email: 'jordan.reyes@octofit.dev',
        age: 26,
        fitnessLevel: 'beginner',
        weeklyGoalMinutes: 180,
      },
      {
        name: 'Noah Kim',
        email: 'noah.kim@octofit.dev',
        age: 31,
        fitnessLevel: 'intermediate',
        weeklyGoalMinutes: 210,
      },
      {
        name: 'Lena Brooks',
        email: 'lena.brooks@octofit.dev',
        age: 28,
        fitnessLevel: 'advanced',
        weeklyGoalMinutes: 320,
      },
    ]);

    const usersByEmail = Object.fromEntries(users.map((user) => [user.email, user]));

    const teams = await Team.insertMany([
      {
        name: 'Stride Squad',
        description: 'Runners focused on pace and distance progression.',
        captainId: usersByEmail['mina.patel@octofit.dev']._id,
        memberIds: [
          usersByEmail['mina.patel@octofit.dev']._id,
          usersByEmail['avery.stone@octofit.dev']._id,
          usersByEmail['jordan.reyes@octofit.dev']._id,
        ],
      },
      {
        name: 'Core Crushers',
        description: 'Strength and HIIT crew competing on consistency.',
        captainId: usersByEmail['lena.brooks@octofit.dev']._id,
        memberIds: [
          usersByEmail['lena.brooks@octofit.dev']._id,
          usersByEmail['noah.kim@octofit.dev']._id,
          usersByEmail['avery.stone@octofit.dev']._id,
        ],
      },
    ]);

    const teamsByName = Object.fromEntries(teams.map((team) => [team.name, team]));

    await Activity.insertMany([
      {
        userId: usersByEmail['mina.patel@octofit.dev']._id,
        teamId: teamsByName['Stride Squad']._id,
        type: 'run',
        durationMinutes: 52,
        caloriesBurned: 540,
        distanceKm: 9.6,
        activityDate: new Date('2026-07-21T06:30:00Z'),
      },
      {
        userId: usersByEmail['avery.stone@octofit.dev']._id,
        teamId: teamsByName['Stride Squad']._id,
        type: 'walk',
        durationMinutes: 40,
        caloriesBurned: 210,
        distanceKm: 3.7,
        activityDate: new Date('2026-07-22T12:00:00Z'),
      },
      {
        userId: usersByEmail['jordan.reyes@octofit.dev']._id,
        teamId: teamsByName['Stride Squad']._id,
        type: 'run',
        durationMinutes: 28,
        caloriesBurned: 280,
        distanceKm: 4.3,
        activityDate: new Date('2026-07-23T17:40:00Z'),
      },
      {
        userId: usersByEmail['lena.brooks@octofit.dev']._id,
        teamId: teamsByName['Core Crushers']._id,
        type: 'strength',
        durationMinutes: 50,
        caloriesBurned: 460,
        activityDate: new Date('2026-07-24T07:15:00Z'),
      },
      {
        userId: usersByEmail['noah.kim@octofit.dev']._id,
        teamId: teamsByName['Core Crushers']._id,
        type: 'hiit',
        durationMinutes: 35,
        caloriesBurned: 390,
        activityDate: new Date('2026-07-24T18:20:00Z'),
      },
      {
        userId: usersByEmail['avery.stone@octofit.dev']._id,
        teamId: teamsByName['Core Crushers']._id,
        type: 'yoga',
        durationMinutes: 30,
        caloriesBurned: 140,
        activityDate: new Date('2026-07-25T06:50:00Z'),
      },
      {
        userId: usersByEmail['mina.patel@octofit.dev']._id,
        teamId: teamsByName['Stride Squad']._id,
        type: 'ride',
        durationMinutes: 70,
        caloriesBurned: 620,
        distanceKm: 24.8,
        activityDate: new Date('2026-07-26T08:10:00Z'),
      },
      {
        userId: usersByEmail['lena.brooks@octofit.dev']._id,
        teamId: teamsByName['Core Crushers']._id,
        type: 'swim',
        durationMinutes: 45,
        caloriesBurned: 430,
        distanceKm: 1.4,
        activityDate: new Date('2026-07-26T16:35:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        period: '2026-W30',
        teamId: teamsByName['Stride Squad']._id,
        totalPoints: 2140,
        rank: 1,
      },
      {
        period: '2026-W30',
        teamId: teamsByName['Core Crushers']._id,
        totalPoints: 1985,
        rank: 2,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Mobility Flow',
        focus: 'Mobility',
        difficulty: 'beginner',
        durationMinutes: 20,
        equipment: ['yoga mat'],
        tags: ['recovery', 'flexibility'],
        recommendedFor: ['desk workers', 'active recovery days'],
      },
      {
        title: 'Tempo Run Builder',
        focus: 'Cardio Endurance',
        difficulty: 'intermediate',
        durationMinutes: 45,
        equipment: ['running shoes'],
        tags: ['running', 'endurance'],
        recommendedFor: ['5K training', 'pace improvement'],
      },
      {
        title: 'Full-Body Strength Circuit',
        focus: 'Strength',
        difficulty: 'advanced',
        durationMinutes: 50,
        equipment: ['dumbbells', 'kettlebell'],
        tags: ['strength', 'circuit', 'functional'],
        recommendedFor: ['muscle gain', 'metabolic conditioning'],
      },
      {
        title: 'HIIT Core Igniter',
        focus: 'HIIT',
        difficulty: 'intermediate',
        durationMinutes: 30,
        equipment: ['exercise mat', 'resistance band'],
        tags: ['hiit', 'core'],
        recommendedFor: ['busy schedules', 'fat loss'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

async function seedDatabase() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('playerhubs');
    
    console.log('Clearing existing data...');
    await db.collection('users').deleteMany({});
    await db.collection('players').deleteMany({});
    await db.collection('teams').deleteMany({});
    await db.collection('owners').deleteMany({});
    
    console.log('Creating sample users...');
    const users = [
      {
        email: 'admin@playerhubs.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uDfG',
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'player1@example.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uDfG',
        role: 'PLAYER',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'owner1@example.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uDfG',
        role: 'OWNER',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    const userResult = await db.collection('users').insertMany(users);
    console.log(`Created ${userResult.insertedCount} users`);
    
    console.log('Creating sample teams...');
    const teams = [
      {
        teamName: 'Thunder Hawks',
        teamNameEn: 'Thunder Hawks',
        teamLogo: '/images/teams/thunder-hawks.png',
        teamDescription: 'Professional esports team specializing in competitive gaming',
        foundedYear: 2020,
        homeArena: 'Gaming Arena Central',
        coach: 'Mike Johnson',
        championships: 3,
        teamMembers: [],
        ownerId: Object.values(userResult.insertedIds)[2],
        teamAchievements: ['Regional Champions 2023', 'World Cup Finalists 2022'],
        teamStats: {
          pointsPerGame: '85.5',
          twoFGP: '45.2',
          threeFGP: '38.7',
          freeThrowPercentage: '82.1',
          assistsPerGame: '22.3',
          reboundsPerGame: '42.1'
        },
        teamSocialLinks: ['https://twitter.com/thunderhawks', 'https://instagram.com/thunderhawks'],
        isActive: true,
        games: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    const teamResult = await db.collection('teams').insertMany(teams);
    console.log(`Created ${teamResult.insertedCount} teams`);
    
    console.log('Creating sample players...');
    const players = [
      {
        userId: Object.values(userResult.insertedIds)[1],
        name: 'Alex Rodriguez',
        email: 'player1@example.com',
        profilePicture: '/images/players/alex-rodriguez.jpg',
        age: 24,
        height: 180,
        weight: 75,
        position: 'Forward',
        jerseyNumber: 10,
        status: 'ACTIVE',
        bio: 'Professional esports player with 5 years of competitive experience',
        teamId: Object.values(teamResult.insertedIds)[0],
        stats: [],
        careerHistory: ['Started gaming at age 16', 'Joined Thunder Hawks in 2022'],
        achievements: ['MVP Award 2023', 'Best Rookie 2021'],
        socialLinks: {
          twitter: 'https://twitter.com/alexrodriguez',
          instagram: 'https://instagram.com/alexrodriguez'
        },
        donationEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sarah Chen',
        email: 'sarah.chen@example.com',
        profilePicture: '/images/players/sarah-chen.jpg',
        age: 22,
        height: 165,
        weight: 60,
        position: 'Support',
        jerseyNumber: 7,
        status: 'ACTIVE',
        bio: 'Rising star in competitive gaming',
        stats: [],
        careerHistory: ['Started professional gaming in 2021'],
        achievements: ['Best Support Player 2023'],
        socialLinks: {
          twitter: 'https://twitter.com/sarahchen',
          instagram: 'https://instagram.com/sarahchen'
        },
        donationEnabled: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    const playerResult = await db.collection('players').insertMany(players);
    console.log(`Created ${playerResult.insertedCount} players`);
    
    await db.collection('teams').updateOne(
      { _id: Object.values(teamResult.insertedIds)[0] },
      { $set: { teamMembers: [Object.values(playerResult.insertedIds)[0]] } }
    );
    
    console.log('Creating sample player stats...');
    const playerStats = [
      {
        playerId: Object.values(playerResult.insertedIds)[0],
        season: '2024',
        gamesPlayed: 25,
        minutesPlayed: 1200,
        fieldGoals: { made: 180, attempted: 400, percentage: 45.0 },
        threePoints: { made: 60, attempted: 150, percentage: 40.0 },
        freeThrows: { made: 80, attempted: 100, percentage: 80.0 },
        rebounds: { offensive: 50, defensive: 120, total: 170 },
        assists: 150,
        steals: 45,
        blocks: 25,
        turnovers: 60,
        personalFouls: 40,
        points: 500,
        rating: 8.5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    const statsResult = await db.collection('playerstats').insertMany(playerStats);
    console.log(`Created ${statsResult.insertedCount} player stats`);
    
    console.log('Database seeded successfully!');
    console.log('\nSample login credentials:');
    console.log('Admin: admin@playerhubs.com / Admin123!');
    console.log('Player: player1@example.com / Player123!');
    console.log('Owner: owner1@example.com / Owner123!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase(); 
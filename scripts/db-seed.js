const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seedDatabase() {
  try {
    const seedPath = path.join(__dirname, '..', 'lib', 'database', 'seeders.sql');
    const seedData = fs.readFileSync(seedPath, 'utf8');
    
    await pool.query(seedData);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedDatabase();
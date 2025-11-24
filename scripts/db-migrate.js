const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrateDatabase() {
  try {
    await pool.query(`
      ALTER TABLE market_predictions 
      DROP COLUMN IF EXISTS market_name, 
      DROP COLUMN IF EXISTS prediction, 
      DROP COLUMN IF EXISTS confidence_score;
    `);
    
    await pool.query(`
      ALTER TABLE market_predictions 
      ADD COLUMN IF NOT EXISTS data JSONB;
    `);
    
    console.log('Database migrated successfully');
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrateDatabase();
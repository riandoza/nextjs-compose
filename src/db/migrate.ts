import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, pool } from './connection';

async function runMigrations() {
  console.log('🔄 Running Drizzle PostgreSQL migrations...');
  
  try {
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('✅ Migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations().catch(console.error);
}

export { runMigrations };
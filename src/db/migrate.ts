import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db, sqlite } from './connection';

async function runMigrations() {
  console.log('🔄 Running Drizzle migrations...');
  
  try {
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('✅ Migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    sqlite.close();
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations().catch(console.error);
}

export { runMigrations };
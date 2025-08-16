import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

const sqlite = new Database(process.env.DATABASE_URL || './dev.db');

// Enable WAL mode for better performance
sqlite.pragma('journal_mode = WAL');

// Create database instance with schema
export const db = drizzle(sqlite, { schema });

// Graceful shutdown handlers
if (typeof process !== 'undefined') {
  process.on('exit', () => sqlite.close());
  process.on('SIGHUP', () => process.exit(128 + 1));
  process.on('SIGINT', () => process.exit(128 + 2));
  process.on('SIGTERM', () => process.exit(128 + 15));
}

export { sqlite };
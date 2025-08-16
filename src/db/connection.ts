import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Create PostgreSQL connection pool
let pool: Pool;

// Check if we're in a build environment
const isDuringBuild = typeof process !== 'undefined' && process.env.NEXT_PHASE === 'phase-production-build';

try {
  const connectionString = process.env.DATABASE_URL || 'postgresql://nextjs_user:nextjs_password@localhost:5432/nextjs_app';
  
  if (isDuringBuild) {
    // Use a minimal connection during build
    pool = new Pool({
      connectionString: 'postgresql://dummy:dummy@localhost:5432/dummy',
      max: 1,
    });
  } else {
    pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 10, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
    });
  }
} catch (error) {
  console.warn('Failed to create database connection pool during build:', error);
  // Create a dummy pool for build-time
  pool = new Pool({
    connectionString: 'postgresql://dummy:dummy@localhost:5432/dummy',
    max: 1,
  });
}

// Create database instance with schema
export const db = drizzle(pool, { schema });

// Graceful shutdown handlers
if (typeof process !== 'undefined') {
  process.on('exit', async () => {
    await pool.end();
  });
  process.on('SIGHUP', async () => {
    await pool.end();
    process.exit(128 + 1);
  });
  process.on('SIGINT', async () => {
    await pool.end();
    process.exit(128 + 2);
  });
  process.on('SIGTERM', async () => {
    await pool.end();
    process.exit(128 + 15);
  });
}

export { pool };
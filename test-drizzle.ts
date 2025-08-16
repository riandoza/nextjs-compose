// Simple test to verify Drizzle setup works
import { db } from './src/db/connection';
import { users } from './src/db/schema';

async function testDrizzleConnection() {
  try {
    console.log('🔄 Testing Drizzle connection...');
    
    // Test basic connection
    const result = await db.select().from(users).limit(1);
    console.log('✅ Drizzle connection successful!');
    console.log('📊 Current users count:', result.length);
    
    return true;
  } catch (error) {
    console.error('❌ Drizzle connection failed:', error);
    return false;
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testDrizzleConnection().then(success => {
    process.exit(success ? 0 : 1);
  });
}

export { testDrizzleConnection };
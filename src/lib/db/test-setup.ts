import 'fake-indexeddb/auto';
import { db } from './index';

beforeEach(async () => {
  // Delete and recreate the database before each test
  await db.delete();
  await db.open();
});

afterEach(async () => {
  // Clean up after each test
  await db.close();
});
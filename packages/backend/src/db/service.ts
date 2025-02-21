import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as authSchema from './schema/auth-schema';
import * as eventsSchema from './schema/events-schema';
import * as personasSchema from './schema/personas-schema';

config({ path: '.env' });

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error('DATABASE_URL is not set');
}

const client = postgres(url);
export const nurseryDb = drizzle({ client, schema: { ...authSchema, ...personasSchema, ...eventsSchema } });

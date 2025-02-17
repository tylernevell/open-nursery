import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { babiesTable, babyToCaregiversTable } from "./schema/personas-schema";

config({ path: ".env" });

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL is not set");
}

const client = postgres(url);
export const nurseryDb = drizzle({ client });

export async function getBabiesByCaregiver(caregiverId: number) {
  return nurseryDb
    .select({
      baby: babiesTable,
      role: babyToCaregiversTable.role,
    })
    .from(babyToCaregiversTable)
    .where(eq(babyToCaregiversTable.caregiverId, caregiverId))
    .innerJoin(babiesTable, eq(babiesTable.id, babyToCaregiversTable.babyId));
}

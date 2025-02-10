import "dotenv/config";
import {
  babiesTable,
  babyToCaregiversTable,
  caregiversTable,
} from "./schema/users";
import { nurseryDb } from "./service";
import {
  eventsTable,
  sleepEventsTable,
  feedingEventsTable,
  diaperEventsTable,
} from "./schema/events";

async function seedUsers() {
  const mockCaregivers: (typeof caregiversTable.$inferInsert)[] = [
    {
      fullName: "kurt king",
      email: "kurt@example.com",
      relationship: "father",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fullName: "christina king",
      email: "christina@example.com",
      relationship: "mother",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await nurseryDb.insert(caregiversTable).values(mockCaregivers);
  console.log("New caregivers created!");

  const caregivers = await nurseryDb.select().from(caregiversTable);
  console.log("Getting all caregivers from the database: ", caregivers);

  const mockBabies: (typeof babiesTable.$inferInsert)[] = [
    {
      name: "Cruz King",
      dateOfBirth: new Date("2023-06-15"),
      birthWeight: 3500, // grams
      birthLength: 510, // millimeters
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Josie King",
      dateOfBirth: new Date("2024-01-01"),
      birthWeight: 3200,
      birthLength: 500,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await nurseryDb.insert(babiesTable).values(mockBabies);
  console.log("New babies created!");

  const babies = await nurseryDb.select().from(babiesTable);
  console.log("Getting all babies from the database: ", babies);

  /**
   * Mock relationships between caregivers and babies
   */
  const mockRelationships: (typeof babyToCaregiversTable.$inferInsert)[] = [
    // Kurt's relationships
    {
      caregiverId: caregivers[0].id,
      babyId: babies[0].id,
      role: "primary",
      createdAt: new Date(),
    },
    {
      caregiverId: caregivers[0].id,
      babyId: babies[1].id,
      role: "primary",
      createdAt: new Date(),
    },
    // Christina's relationships
    {
      caregiverId: caregivers[1].id,
      babyId: babies[0].id,
      role: "primary",
      createdAt: new Date(),
    },
    {
      caregiverId: caregivers[1].id,
      babyId: babies[1].id,
      role: "primary",
      createdAt: new Date(),
    },
  ];

  await nurseryDb.insert(babyToCaregiversTable).values(mockRelationships);
  console.log("Relationships created!");

  const relationships = await nurseryDb.select().from(babyToCaregiversTable);
  console.log("Getting all relationships: ", relationships);
}

async function seedEvents() {
  const caregivers = await nurseryDb.select().from(caregiversTable);
  const babies = await nurseryDb.select().from(babiesTable);

  const [cruz, josie] = babies;
  const [kurt, christina] = caregivers;

  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  const mockEvents = [
    // Cruz's events
    {
      babyId: cruz.id,
      caregiverId: kurt.id,
      type: "sleep" as const,
      timestamp: new Date("2024-02-10T20:00:00"),
      sleep: {
        startTime: new Date("2024-02-10T20:00:00"),
        endTime: new Date("2024-02-10T23:00:00"),
        location: "crib" as const,
      },
    },
    {
      babyId: cruz.id,
      caregiverId: christina.id,
      type: "sleep" as const,
      timestamp: new Date("2024-02-11T02:00:00"),
      sleep: {
        startTime: new Date("2024-02-11T02:00:00"),
        endTime: new Date("2024-02-11T05:00:00"),
        location: "parent_bed" as const,
      },
    },
    {
      babyId: cruz.id,
      caregiverId: christina.id,
      type: "feeding" as const,
      timestamp: new Date("2024-02-10T19:00:00"),
      feeding: {
        method: "bottle" as const,
        amount: 120,
        duration: 15,
      },
    },
    {
      babyId: cruz.id,
      caregiverId: kurt.id,
      type: "feeding" as const,
      timestamp: new Date("2024-02-11T01:00:00"),
      feeding: {
        method: "bottle" as const,
        amount: 90,
        duration: 12,
      },
    },
    {
      babyId: cruz.id,
      caregiverId: kurt.id,
      type: "diaper" as const,
      timestamp: new Date("2024-02-10T18:30:00"),
      diaper: {
        content: "wet" as const,
      },
    },
    {
      babyId: cruz.id,
      caregiverId: christina.id,
      type: "diaper" as const,
      timestamp: new Date("2024-02-11T00:30:00"),
      diaper: {
        content: "both" as const,
      },
    },

    // Josie's events
    {
      babyId: josie.id,
      caregiverId: christina.id,
      type: "sleep" as const,
      timestamp: new Date("2024-02-10T19:30:00"),
      sleep: {
        startTime: new Date("2024-02-10T19:30:00"),
        endTime: new Date("2024-02-10T22:30:00"),
        location: "bassinet" as const,
      },
    },
    {
      babyId: josie.id,
      caregiverId: kurt.id,
      type: "sleep" as const,
      timestamp: new Date("2024-02-11T01:30:00"),
      sleep: {
        startTime: new Date("2024-02-11T01:30:00"),
        endTime: new Date("2024-02-11T04:30:00"),
        location: "crib" as const,
      },
    },
    {
      babyId: josie.id,
      caregiverId: christina.id,
      type: "feeding" as const,
      timestamp: new Date("2024-02-10T19:00:00"),
      feeding: {
        method: "breast" as const,
        duration: 20,
        side: "left" as const,
      },
    },
    {
      babyId: josie.id,
      caregiverId: christina.id,
      type: "feeding" as const,
      timestamp: new Date("2024-02-11T01:00:00"),
      feeding: {
        method: "breast" as const,
        duration: 15,
        side: "right" as const,
      },
    },
    {
      babyId: josie.id,
      caregiverId: kurt.id,
      type: "diaper" as const,
      timestamp: new Date("2024-02-10T18:45:00"),
      diaper: {
        content: "wet" as const,
      },
    },
    {
      babyId: josie.id,
      caregiverId: christina.id,
      type: "diaper" as const,
      timestamp: new Date("2024-02-11T00:45:00"),
      diaper: {
        content: "dirty" as const,
      },
    },
  ];

  for (const eventData of mockEvents) {
    const { type, sleep, feeding, diaper, ...baseEvent } = eventData;

    await nurseryDb.transaction(async (tx) => {
      const [event] = await tx
        .insert(eventsTable)
        .values({
          ...baseEvent,
          type,
        })
        .returning();

      switch (type) {
        case "sleep":
          await tx.insert(sleepEventsTable).values({
            eventId: event.id,
            ...sleep,
          });
          break;
        case "feeding":
          await tx.insert(feedingEventsTable).values({
            eventId: event.id,
            ...feeding,
          });
          break;
        case "diaper":
          await tx.insert(diaperEventsTable).values({
            eventId: event.id,
            ...diaper,
          });
          break;
      }
    });
  }

  console.log("Events created!");

  const events = await nurseryDb.select().from(eventsTable);
  console.log("Events in database:", events);
}

async function main() {
  await seedUsers();
  await seedEvents();
}

main().catch(console.error);

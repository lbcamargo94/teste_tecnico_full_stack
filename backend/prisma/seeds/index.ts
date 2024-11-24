import { database } from "@database/connection";
import { DataSeedCustomers } from "./customers";
import { DataSeedDrivers } from "./drivers";
import { DataSeedTrips } from "./trips";
import { DataSeedAssessments } from "./assessments";

async function main() {
  // Customers/Customers
  const seed_customers = database.customer.createMany({
    data: DataSeedCustomers,
  });

  // // Drivers
  const seed_drivers = database.driver.createMany({
    data: DataSeedDrivers,
  });

  // // Trips
  const seed_trips = database.trip.createMany({
    data: DataSeedTrips,
  });

  // // Assessment
  const seed_assessment = database.assessment.createMany({
    data: DataSeedAssessments,
  });

  // Generate Seeds
  if (seed_customers && seed_drivers && seed_trips && seed_assessment) {
    await database.$transaction([
      seed_customers,
      seed_drivers,
      seed_trips,
      seed_assessment,
    ]);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await database.$disconnect();
  });
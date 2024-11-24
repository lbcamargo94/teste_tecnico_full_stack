-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "user_id" VARCHAR(8) NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "vehicle" VARCHAR NOT NULL,
    "comment" VARCHAR NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "minimum_distance" INTEGER NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trips" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "driver_id" UUID NOT NULL,
    "origin" VARCHAR NOT NULL,
    "destination" VARCHAR NOT NULL,
    "duration" VARCHAR NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_id_key" ON "drivers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "trips_id_key" ON "trips"("id");

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

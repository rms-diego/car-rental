/*
  Warnings:

  - You are about to drop the column `reserveId` on the `vehicle` table. All the data in the column will be lost.
  - Added the required column `vehicleId` to the `reserve` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vehicleImage" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_vehicle" ("brand", "id", "name", "type", "userId", "vehicleImage") SELECT "brand", "id", "name", "type", "userId", "vehicleImage" FROM "vehicle";
DROP TABLE "vehicle";
ALTER TABLE "new_vehicle" RENAME TO "vehicle";
CREATE TABLE "new_reserve" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresIn" DATETIME NOT NULL,
    "vehicleId" TEXT NOT NULL,
    CONSTRAINT "reserve_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_reserve" ("createdAt", "expiresIn", "id") SELECT "createdAt", "expiresIn", "id" FROM "reserve";
DROP TABLE "reserve";
ALTER TABLE "new_reserve" RENAME TO "reserve";
CREATE UNIQUE INDEX "reserve_vehicleId_key" ON "reserve"("vehicleId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - Made the column `hourCost` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lightCost` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "lightCost" REAL NOT NULL,
    "hourCost" REAL NOT NULL,
    "date" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Project" ("date", "description", "hourCost", "id", "lightCost", "name") SELECT "date", "description", "hourCost", "id", "lightCost", "name" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

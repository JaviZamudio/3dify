-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "lightCost" REAL,
    "hourCost" REAL,
    "date" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Project" ("date", "description", "hourCost", "id", "lightCost", "name") SELECT "date", "description", "hourCost", "id", "lightCost", "name" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

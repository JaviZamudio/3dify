-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Figure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "hours" REAL NOT NULL,
    "weight" INTEGER NOT NULL,
    "waste" INTEGER NOT NULL DEFAULT 0,
    "projectId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    CONSTRAINT "Figure_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Figure_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Figure" ("description", "hours", "id", "materialId", "name", "projectId", "weight") SELECT "description", "hours", "id", "materialId", "name", "projectId", "weight" FROM "Figure";
DROP TABLE "Figure";
ALTER TABLE "new_Figure" RENAME TO "Figure";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

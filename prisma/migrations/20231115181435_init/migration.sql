-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "lightCost" REAL,
    "hourCost" REAL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT
);

-- CreateTable
CREATE TABLE "Material" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stock" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Figure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "hours" REAL NOT NULL,
    "weight" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    CONSTRAINT "Figure_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Figure_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_MaterialToProvider" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MaterialToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "Material" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MaterialToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "Provider" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_MaterialToProvider_AB_unique" ON "_MaterialToProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_MaterialToProvider_B_index" ON "_MaterialToProvider"("B");

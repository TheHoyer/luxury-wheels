const Database = require('better-sqlite3');
const path = require('path');

// Ścieżka jest teraz relatywna do folderu backend/
const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../database/luxury_wheels.db');
const db = new Database(dbPath, { /* verbose: console.log */ }); // verbose można wyłączyć dla produkcji

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

module.exports = db;
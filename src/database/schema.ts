import * as SQLite from 'expo-sqlite';

export const initDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('noteback.db');
  
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    
    CREATE TABLE IF NOT EXISTS receipts (
      id TEXT PRIMARY KEY,
      store_name TEXT,
      cnpj TEXT,
      total_value REAL,
      issue_date TEXT,
      access_key TEXT,
      created_at TEXT
    );
    
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      receipt_id TEXT,
      name TEXT,
      code TEXT,
      quantity REAL,
      unit_price REAL,
      total_price REAL,
      unit TEXT,
      FOREIGN KEY (receipt_id) REFERENCES receipts (id) ON DELETE CASCADE
    );
  `);
  
  return db;
};

import type { SQLiteDatabase } from 'expo-sqlite';

async function seed(db: SQLiteDatabase) {
  if (!__DEV__) return;

  const row = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM memos',
  );
  if (row && row.count > 0) return;

  await db.execAsync(`
    INSERT INTO memos (content) VALUES
      ('Welcome to taste-kit!'),
      ('This is a sample memo.');
  `);
}

export async function migrate(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS memos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  await seed(db);
}

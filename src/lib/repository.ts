import { useSQLiteContext } from 'expo-sqlite';

export interface Memo {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export function useMemoRepository() {
  const db = useSQLiteContext();

  return {
    async getAll(): Promise<Memo[]> {
      return db.getAllAsync<Memo>('SELECT * FROM memos ORDER BY created_at DESC');
    },

    async getById(id: number): Promise<Memo | null> {
      return db.getFirstAsync<Memo>('SELECT * FROM memos WHERE id = ?', id);
    },

    async create(content: string): Promise<Memo> {
      const result = await db.runAsync('INSERT INTO memos (content) VALUES (?)', content);
      return (await db.getFirstAsync<Memo>(
        'SELECT * FROM memos WHERE id = ?',
        result.lastInsertRowId,
      ))!;
    },

    async update(id: number, content: string): Promise<Memo> {
      await db.runAsync(
        "UPDATE memos SET content = ?, updated_at = datetime('now') WHERE id = ?",
        content,
        id,
      );
      return (await db.getFirstAsync<Memo>('SELECT * FROM memos WHERE id = ?', id))!;
    },

    async remove(id: number): Promise<void> {
      await db.runAsync('DELETE FROM memos WHERE id = ?', id);
    },
  };
}

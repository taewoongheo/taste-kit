import type { SQLiteDatabase } from 'expo-sqlite';
import { create } from 'zustand';

export interface Memo {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

interface MemoState {
  memos: Memo[];
  isLoaded: boolean;
  _db: SQLiteDatabase | null;

  init: (db: SQLiteDatabase) => Promise<void>;
  create: (content: string) => Promise<void>;
  update: (id: number, content: string) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export const useMemoStore = create<MemoState>()((set, get) => ({
  memos: [],
  isLoaded: false,
  _db: null,

  async init(db) {
    set({ _db: db });
    const memos = await db.getAllAsync<Memo>('SELECT * FROM memos ORDER BY created_at DESC');
    set({ memos, isLoaded: true });
  },

  async create(content) {
    const { _db: db } = get();
    if (!db) return;
    const result = await db.runAsync('INSERT INTO memos (content) VALUES (?)', content);
    const memo = await db.getFirstAsync<Memo>(
      'SELECT * FROM memos WHERE id = ?',
      result.lastInsertRowId,
    );
    if (memo) set((s) => ({ memos: [memo, ...s.memos] }));
  },

  async update(id, content) {
    const { _db: db } = get();
    if (!db) return;
    await db.runAsync(
      "UPDATE memos SET content = ?, updated_at = datetime('now') WHERE id = ?",
      content,
      id,
    );
    const memo = await db.getFirstAsync<Memo>('SELECT * FROM memos WHERE id = ?', id);
    if (memo) set((s) => ({ memos: s.memos.map((m) => (m.id === id ? memo : m)) }));
  },

  async remove(id) {
    const { _db: db } = get();
    if (!db) return;
    await db.runAsync('DELETE FROM memos WHERE id = ?', id);
    set((s) => ({ memos: s.memos.filter((m) => m.id !== id) }));
  },
}));

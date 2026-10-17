// database/db.js
import * as SQLite from 'expo-sqlite';

let db;

// Cria a tabela se ainda não existir
export async function inicializarBanco() {
  db = await SQLite.openDatabaseAsync('minhasfinancas.db');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS transacoes (
      id          TEXT PRIMARY KEY,
      descricao   TEXT NOT NULL,
      valor       REAL NOT NULL,
      tipo        TEXT NOT NULL,
      categoria   TEXT NOT NULL,
      data        TEXT NOT NULL,
      latitude    REAL,     -- ← NOVO
      longitude   REAL,     -- ← NOVO
      comprovante TEXT      -- ← NOVO (URI da foto do comprovante)
    );
  `);

  // ← NOVO: migração para quem já tinha o banco da aula anterior sem as colunas novas.
  const colunas = await db.getAllAsync('PRAGMA table_info(transacoes)');
  const nomes = colunas.map(c => c.name);
  if (!nomes.includes('latitude')) {
    await db.execAsync('ALTER TABLE transacoes ADD COLUMN latitude REAL');
    await db.execAsync('ALTER TABLE transacoes ADD COLUMN longitude REAL');
  }
  if (!nomes.includes('comprovante')) {
    await db.execAsync('ALTER TABLE transacoes ADD COLUMN comprovante TEXT');
  }
}

// Retorna todas as transações, mais recentes primeiro
export async function buscarTodasTransacoes() {
  return await db.getAllAsync(
    'SELECT * FROM transacoes ORDER BY rowid DESC'
  );
}

// Insere uma nova transação
export async function inserirTransacao(t) {
  await db.runAsync(
    `INSERT INTO transacoes
      (id, descricao, valor, tipo, categoria, data, latitude, longitude, comprovante)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,                    // ← NOVO: 3 parâmetros a mais
    [
      t.id,
      t.descricao,
      t.valor,
      t.tipo,
      t.categoria,
      t.data,
      t.latitude    ?? null,   // ← NOVO
      t.longitude   ?? null,   // ← NOVO
      t.comprovante ?? null,   // ← NOVO
    ]
  );
}

// Remove uma transação pelo id
export async function excluirTransacao(id) {
  await db.runAsync('DELETE FROM transacoes WHERE id = ?', [id]);
}
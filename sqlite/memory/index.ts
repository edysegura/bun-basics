import { Database } from 'bun:sqlite'

const db = new Database(':memory:')

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  )
`)

db.run(`
  INSERT INTO users (name, email) VALUES
  ('John Doe', 'john.doe@example.com'),
  ('Jane Doe', 'jane.doe@example.com'),
  ('Jim Doe', 'jim.doe@example.com')
`)

const query = db.query('SELECT * FROM users;')
const result = query.get()

console.log(result)

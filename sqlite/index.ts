import { Database } from 'bun:sqlite'

// Initialize the database
const db = new Database('mydb.sqlite', { create: true })

// Create a table (if it doesn't exist)
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  )
`)

// CRUD operations

// 1. Create (Insert)
function createUser(name: string, email: string): number {
  const query = db.prepare(
    'INSERT INTO users (name, email) VALUES ($name, $email)',
  )
  const info = query.run({ $name: name, $email: email })
  return info.lastInsertRowid
}

// 2. Read (Select)
function getUserById(id: number): any {
  const query = db.prepare('SELECT * FROM users WHERE id = $id')
  return query.get({ $id: id })
}

function getAllUsers(): any[] {
  const query = db.prepare('SELECT * FROM users')
  return query.all()
}

// 3. Update
function updateUser(id: number, name?: string, email?: string): number {
  let queryStr = 'UPDATE users SET '
  const updates: string[] = []
  const params: any = { $id: id }

  if (name !== undefined) {
    updates.push('name = $name')
    params.$name = name
  }
  if (email !== undefined) {
    updates.push('email = $email')
    params.$email = email
  }

  queryStr += updates.join(', ')
  queryStr += ' WHERE id = $id'

  const query = db.prepare(queryStr)
  const info = query.run(params)
  return info.changes
}

// 4. Delete
function deleteUser(id: number): number {
  const query = db.prepare('DELETE FROM users WHERE id = $id')
  const info = query.run({ $id: id })
  return info.changes
}

// Example usage:
const newUserId = createUser('John Doe', 'john.doe@example.com')
console.log('New user ID:', newUserId)

const user = getUserById(newUserId)
console.log('User:', user)

updateUser(newUserId, 'Jane Doe', 'jane.doe@example.com')
const updatedUser = getUserById(newUserId)
console.log('Updated user:', updatedUser)

const allUsers = getAllUsers()
console.log('All users:', allUsers)

deleteUser(newUserId)
const deletedUser = getUserById(newUserId)
console.log('Deleted user:', deletedUser) // Should be undefined

// Close the database connection
db.close()

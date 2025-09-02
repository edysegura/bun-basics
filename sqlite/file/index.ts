import { Database } from 'bun:sqlite'

// Initialize the database
const db = new Database('mydb.sqlite', { create: true })

// Create a table (if it doesn't exist)
// Define the user type
type User = {
  id: number
  name: string
  email: string
}

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
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email])
  const query = db.prepare<{ id: number }, {}>(
    'SELECT last_insert_rowid() as id',
  )
  const result = query.get({})
  if (!result || result.id === undefined) {
    throw new Error('Failed to retrieve last insert row ID')
  }
  return result.id
}

// 2. Read (Select)
function getUserById(id: number): User {
  const query = db.prepare('SELECT * FROM users WHERE id = $id')
  return query.get({ $id: id }) as User
}

function getAllUsers(): User[] {
  const query = db.prepare('SELECT * FROM users')
  return query.all() as User[]
}

// 3. Update
function updateUser(id: number, name?: string, email?: string): number {
  let queryStr = 'UPDATE users SET '
  const updates: string[] = []
  const params: any[] = []

  if (name !== undefined) {
    updates.push('name = ?')
    params.push(name)
  }
  if (email !== undefined) {
    updates.push('email = ?')
    params.push(email)
  }

  queryStr += updates.join(', ')
  queryStr += ' WHERE id = ?'
  params.push(id)

  db.run(queryStr, params)
  const query = db.prepare<{ changes: number }, {}>(
    'SELECT changes() as changes',
  )
  const result = query.get({})
  if (!result || result.changes === undefined) {
    throw new Error('Failed to retrieve changes count')
  }
  return result.changes
}

// 4. Delete
function deleteUser(id: number): number {
  db.run('DELETE FROM users WHERE id = ?', [id])
  const query = db.prepare<{ changes: number }, {}>(
    'SELECT changes() as changes',
  )
  const result = query.get({})
  if (!result || result.changes === undefined) {
    throw new Error('Failed to retrieve changes count')
  }
  return result.changes
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

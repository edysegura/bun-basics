export default function userFactory(id: string) {
  return {
    id,
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

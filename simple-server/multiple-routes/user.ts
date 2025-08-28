function userFactory(id: string) {
  return {
    id,
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

type CustomRequest = Request & { params: { id: string } }
export default async function userService(req: CustomRequest) {
  const { id } = req.params
  const user = userFactory(id)
  return Response.json(user)
}

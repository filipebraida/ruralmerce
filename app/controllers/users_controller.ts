import type { HttpContext } from '@adonisjs/core/http'

let sequence = 2

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'doe@gmail.com',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'doe@gmail.com',
  },
]

export default class UsersController {
  index() {
    return users
  }

  create({ request, response }: HttpContext) {
    const user = request.only(['name', 'email'])

    sequence += 1

    users.push({
      id: sequence,
      ...user,
    })

    return response.redirect().toRoute('users.show', { id: sequence })
  }

  show({ params, response }: HttpContext) {
    const id = params.id

    if (id === null) {
      response.status(400)

      return { message: 'id eh obrigatorio' }
    }

    for (const user of users) {
      if (user.id === id) {
        return user
      }
    }

    response.status(404)

    return { message: 'not found' }
  }
}

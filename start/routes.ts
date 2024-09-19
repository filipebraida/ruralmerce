/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

let totalUsers = 2

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

// INSERIR USUARIO
// LISTAR USUARIOS
// SHOW USUARIOS

router.get('/users', async () => {
  return users
})

router.get('/users/show', async ({ request, response }) => {
  const id = request.input('id', null)

  if (id === null) {
    response.status(400)

    return { message: 'id eh obrigatorio' }
  }

  for (const user of users) {
    if (user.id == id) {
      return user
    }
  }

  response.status(404)

  return { message: 'not found' }
})

router.post('/users', async ({ request, response }) => {
  const user = request.only(['name', 'email'])
  totalUsers += 1
  users.push({
    id: totalUsers,
    ...user,
  })

  return response.redirect().toPath(`/users/show?id=${totalUsers}`)
})

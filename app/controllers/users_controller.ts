import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  index() {
    //TODO: Implementar
  }

  create({ view }: HttpContext) {
    return view.render('pages/users/create')
  }

  store() {
    //TODO: Implementar
  }
}

import { HttpContext } from "@adonisjs/core/http"

import Product from "#models/product"

export default class ProductsController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10

    const payload = request.only(['name'])

    const query = Product.query()

    if (payload.name && payload.name.length > 0) {
      query.where('name', 'like', `%${payload.name}%`)
    }

    const products = await query.paginate(page, limit)

    return products
  }

  async show({ params }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    return product
  }

  async store({ request }: HttpContext) {
    const payload = request.only(['name', 'price', 'description'])

    const product = await Product.create(payload)

    return product
  }

  async patch({ params, request}: HttpContext) {
    const product = await Product.findOrFail(params.id)

    const payload = await request.only(['name', 'price', 'description'])
    product.merge(payload)

    await product.save()

    return product
  }

  async destroy({ params }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    await product.delete()

    return { sucess: `${params.id} removido`}
  }
}

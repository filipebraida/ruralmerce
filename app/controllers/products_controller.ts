//import { HttpContext } from "@adonisjs/core/http"

import Product from "#models/product"

export default class ProductsController {
  async index() {
    const data = await fetch('https://fakestoreapi.com/products')

    const products = await data.json()

    return products
  }

  async show() {
    const product = await Product.create({ name: 'oiiiiuiiu' })

    return product
  }
}

const Joi = require('@hapi/joi')
class ProductController {
  constructor (productModel) {
    this._productModel = productModel
  }
  async find (param) {
    try {
      const schema = Joi.object({
        categoryId: Joi.string()
      })
      const value = await schema.validateAsync(param)
      const products = await this._productModel.find(value)
      return products
    } catch (error) {
      throw error
    }
  }
  async findById(query) {
    const schema = Joi.object({
      id: Joi.string().required()
    })
    const value = await schema.validateAsync(query)
    const product = await this._productModel.find(value)
    return product
  }
}
module.exports = ProductController
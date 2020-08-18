const Joi = require('@hapi/joi')
class CartController {
  constructor (cartModel) {
    this._cartModel = cartModel
  }
  async findByUserId(userId) {
    const schema = Joi.object({
      userId: Joi.string().required()
    })
    const value = await schema.validateAsync({userId})
    const cart = await this._cartModel.findByUserId(value)
    return cart
  }
  async deleteProduct (params) {
    const schema = Joi.object({
      id: Joi.string().required(),
      productId: Joi.string().required()
    })
    const value = await schema.validateAsync(params)
    return await this._cartModel.deleteProduct(value)
  }
}
module.exports = CartController
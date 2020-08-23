const Joi = require('@hapi/joi')
class CartController {
  constructor (cartModel) {
    this._cartModel = cartModel
  }
  async findByUserId(userId) {
    const schema = Joi.object({
      userId: Joi.string().required()
    })
    await schema.validateAsync({userId})
    const cart = await this._cartModel.find({userId})
    return cart
  }
  async find(params) {
    const cart = await this._cartModel.find(params)
    return cart
  }
  async deleteProduct (params) {
    const schema = Joi.object({
      userId: Joi.string().required(),
      productId: Joi.string().required()
    })
    const { userId, productId } = await schema.validateAsync(params)
    return await this._cartModel.deleteProduct({ userId, productId })
  }
  async create (params) {
    const schema = Joi.object({
      userId: Joi.string().required(),
      productId: Joi.string().required(),
      qty: Joi.number().required()
    })
    let cartCreated
    const { userId, productId, qty } = await schema.validateAsync(params)
    const cart = await this._cartModel.findOne({userId, productId})
    // IF EXISTS THIS PRODUCT INTO CART
    if (!cart || Object.keys(cart).length === 0) {
      cartCreated = await this._cartModel.create({ userId, productId, qty })
    } else {
      const newQty = cart.qty + qty
      cartCreated = await this._cartModel.update({userId, productId}, { qty: newQty })
    }
  }
}
module.exports = CartController
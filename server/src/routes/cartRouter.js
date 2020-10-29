const path = require('path');
const Router = require('@koa/router');
const CartModel = require(path.resolve(__dirname, '../models/Cart'))
const ProductModel = require(path.resolve(__dirname, '../models/Product'))
const CartController = require(path.resolve(__dirname,'../controllers/cartController')) 
module.exports = function () {
  const router = new Router();
  const cartController = new CartController(CartModel, ProductModel)
  router.post('/carts', async (ctx, next) => {
    try {
      const cart = await cartController.create(ctx.request.body)
      ctx.status = 200;
      ctx.body = {
          cart
      }
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        message: error.message
      }
    }
  })
  router.put('/carts', async (ctx, next) => {
    try {
      const cart = await cartController.update(ctx.request.body)
      ctx.status = 200;
      ctx.body = {
          cart
      }
       
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        message: error.message
      }
    }
  })
  router.get('/carts/:userId', async (ctx, next) => {
    try {
      const cart = await cartController.findByUserId(
        ctx.request.params.userId
      )
      ctx.status = 200
      ctx.body = {
          cart
      }
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        message: error.message
      }
    }
  })
  router.delete('/carts/:userId/:productId', async (ctx, next) => {
    try {
      const cart = await cartController.deleteProduct(ctx.request.params)
      ctx.status = 200
      ctx.body = {
        cart
      }
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        message: error.message
      }
    }
  })
  return router;
}
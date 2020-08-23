const path = require('path');
const Router = require('@koa/router');
const CartModel = require(path.resolve(__dirname, '../models/Cart'))
const CartController = require(path.resolve(__dirname,'../controllers/cartController')) 
module.exports = function () {
  const router = new Router();
  const cartController = new CartController(CartModel)
  router.post('/carts', async (ctx, next) => {
    try {
      const cart = await cartController.create(ctx.request.body)
      ctx.status = 200;
      ctx.body = {
          cart
      }
    } catch (error) {
      console.log(error) 
    }
  })
  return router;
}
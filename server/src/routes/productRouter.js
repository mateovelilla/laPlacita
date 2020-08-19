const path = require('path');
const Router = require('@koa/router');
const ProductModel = require(path.resolve(__dirname, '../models/Product'))
const ProductController = require(path.resolve(__dirname,'../controllers/productController')) 
module.exports = function () {
  const router = new Router();
  const productController = new ProductController(ProductModel)
  router.get('/products', async (ctx, next) => {
    const products = await productController.find({})
    ctx.status = 200;
    ctx.body = {
      products
    }
  })
  return router;
}
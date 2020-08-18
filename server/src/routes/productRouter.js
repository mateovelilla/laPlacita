const path = require('path');
const Router = require('@koa/router');
module.exports = function () {
  const router = new Router();
  router.get('/products', async (ctx, next) => {
    ctx.status = 200;
    ctx.body = {
      message: 'products'
    }
  })
  return router;
}
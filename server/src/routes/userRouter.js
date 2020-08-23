const path = require('path');
const Router = require('@koa/router');
const UserModel = require(path.resolve(__dirname, '../models/User'))
const UserController = require(path.resolve(__dirname,'../controllers/userController')) 
module.exports = function () {
  const router = new Router();
  const userController = new UserController(UserModel)
  router.post('/users', async (ctx, next) => {
    const user = await userController.create()
    ctx.status = 200;
    ctx.body = {
      user
    }
  })
  return router;
}
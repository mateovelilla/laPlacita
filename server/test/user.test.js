// const test = require('ava');
// const path = require('path');
// const UserController = require(path.resolve(__dirname, '../src/controllers/userController'));
// let userController;
// test.before(async t=> {
//   class UserModelMock {
//     async create (user) {
//         return {
//             _id: 'fakeSd'
//         }
//     }
//   }
//   const userModel = new UserModelMock() 
//   userController = new UserController(userModel)
// })
// //
// /** 
//  * GET PRODUCTS TESTS
// */
// test('Get all products', async t => {
//   const productsArray = await productController.find({})
//   t.is(typeof productsArray, 'object')
// });

// // test('Get product by id fails', async t => {
// //   await t.throwsAsync(
// //     async () => {
// //       await productController.findById({})
// //     }, {
// //       instanceOf: Error,
// //       message: '"id" is required'
// //     }
// //   )
// //   await t.throwsAsync(
// //     async () => {
// //       await productController.findById({
// //         id: 'nonEx1st3nt1D'
// //       })
// //     }, {
// //       instanceOf: Error,
// //       message: 'No such product'
// //     }
// //   )
// // })
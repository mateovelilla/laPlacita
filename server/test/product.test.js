const test = require('ava');
const path = require('path');
const ProductController = require(path.resolve(__dirname, '../src/controllers/productController'));
let productController;
test.before(async t=> {
  class ProductModelMock {
    async find (params) {
      if (params.id && params.id === 'nonEx1st3nt1D')
        throw Error('No such product')
      return [];
    }
  }
  const productModel = new ProductModelMock() 
  productController = new ProductController(productModel)
})
/** 
 * GET PRODUCTS TESTS
*/
test('Get all products', async t => {
  const productsArray = await productController.find({})
  t.is(typeof productsArray, 'object')
});

test('Get product by id fails', async t => {
  await t.throwsAsync(
    async () => {
      await productController.findById({})
    }, {
      instanceOf: Error,
      message: '"id" is required'
    }
  )
  await t.throwsAsync(
    async () => {
      await productController.findById({
        id: 'nonEx1st3nt1D'
      })
    }, {
      instanceOf: Error,
      message: 'No such product'
    }
  )
})




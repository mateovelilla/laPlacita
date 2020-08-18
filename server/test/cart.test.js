const test = require('ava');
const path = require('path');
const CartController = require(path.resolve(__dirname, '../src/controllers/cartController'));
let cartController;
test.before(async t=> {
  class CartModelMock {
		async findByUserId({userId}) {
			if (userId === 'nonEx1st3nt1D')
				throw Error('No such cart')
			return []
		}
		async deleteProduct(params) {
			return true
		}
	}
	const cartModelMock = new CartModelMock()
	cartController = new CartController(cartModelMock)
})

/** 
 * GET CART TESTS
*/
test('Get cart by userId fails - userId field', async t => {
	await t.throwsAsync(
		async () => {
			const cart = await cartController.findByUserId('')
    }, {
      instanceOf: Error,
      message: '"userId" is not allowed to be empty'
    }
	)
	await t.throwsAsync(
		async () => {
			const cart = await cartController.findByUserId()
    }, {
      instanceOf: Error,
      message: '"userId" is required'
    }
	)
	await t.throwsAsync(
		async () => {
			const cart = await cartController.findByUserId('nonEx1st3nt1D')
    }, {
      instanceOf: Error,
      message: 'No such cart'
    }
  )
});

test('Get cart by userId Ok', async t => {
	const cart = await cartController.findByUserId('F4K3Id')
	t.is(typeof cart, 'object');
});

// DELETE PRODUCT IN THE CART
test('Delete product fails - productId field', async t => {
	await t.throwsAsync(
		async () => {
			await cartController.deleteProduct({})
    }, {
			instanceOf: Error,
			message: '"id" is required'
    }
  )
});
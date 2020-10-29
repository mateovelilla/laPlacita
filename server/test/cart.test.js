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
		async deleteOne(params) {
			return true
    }
    async find ({userId}) {
      if (userId === 'nonEx1st3nt1D')
        throw Error('No such cart')
      return []
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
			await cartController.findByUserId('')
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
			await cartController.findByUserId('nonEx1st3nt1D')
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
			await cartController.deleteProduct({userId:'F4k3User'})
    }, {
			instanceOf: Error,
			message: '"productId" is required'
    }
  )
});

test('Delete product fails - userId field', async t => {
	await t.throwsAsync(
		async () => {
			await cartController.deleteProduct({productId:'F4k3Product'})
    }, {
			instanceOf: Error,
			message: '"userId" is required'
    }
  )
});

test('Delete product Ok', async t => {
  const response = await cartController.deleteProduct({productId:'F4k3Product', userId:'F4k3User'})
  t.true(response)
});

// ADD PRODUCT TO CART
test('Add product to cart fails - productId field', async t => {
	await t.throwsAsync(
		async () => {
			await cartController.create({userId:'F4k3User'})
    }, {
			instanceOf: Error,
			message: '"productId" is required'
    }
  )
});

test('Add product to cart fails - userId field', async t => {
	await t.throwsAsync(
		async () => {
			await cartController.create({productId:'F4k3Product'})
    }, {
			instanceOf: Error,
			message: '"userId" is required'
    }
  )
});

test('Add product to cart fails - qty field', async t => {
	await t.throwsAsync(
		async () => {
			await cartController.create({productId:'F4k3Product', userId:'F4k3User'})
    }, {
			instanceOf: Error,
			message: '"qty" is required'
    }
  )
  await t.throwsAsync(
		async () => {
			await cartController.create({productId:'F4k3Product', userId:'F4k3User', qty: ''})
    }, {
			instanceOf: Error,
			message: '"qty" must be a number'
    }
  )
  await t.throwsAsync(
		async () => {
			await cartController.create({productId:'F4k3Product', userId:'F4k3User', qty: undefined})
    }, {
			instanceOf: Error,
			message: '"qty" is required'
    }
  )
});
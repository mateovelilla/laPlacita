const Joi = require('@hapi/joi')
class UserController {
  constructor (userModel) {
    this._userModel = userModel
  }
  async create () {
		try {
			const user = await this._userModel.create({})
			return user
		} catch (error) {
			throw error
    }
  }
}
module.exports = UserController
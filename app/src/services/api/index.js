import axios from 'axios'

const API = axios.create({
  baseURL: process.env.VUE_APP_API_HOST
})

export default {
  async getProducts () {
    try {
      const response = API.get('/products')
      return response
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  },
  async getUserId () {
    try {
      const response = API.post('/users')
      return response
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  },
  async addProductToCart ({ userId, productId, qty }) {
    try {
      const response = API.post('/carts', {
        userId,
        productId,
        qty
      })
      return response
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  },
  async getCart ({ userId }) {
    try {
      const response = API.get(`/carts/${userId}`)
      return response
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }
}

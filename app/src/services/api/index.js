import axios from 'axios'

const API = axios.create({
  baseURL: process.env.VUE_APP_API_HOST
})

export default {
  async getProducts () {
    try {
      const response = await API.get('/products')
      return response
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  },
  async getUserId () {
    try {
      const response = await API.post('/users')
      return response
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  },
  async addProductToCart ({ userId, productId, qty }) {
    try {
      const response = await API.post('/carts', {
        userId,
        productId,
        qty
      })
      return response
    } catch (error) {
      console.log('Entro aca')
      console.log(error)
      throw new Error(error.response.data.message)
    }
  },
  async getCart ({ userId }) {
    try {
      const response = await API.get(`/carts/${userId}`)
      return response
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }
}

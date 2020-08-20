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
  }
}

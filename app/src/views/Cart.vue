<template>
  <div>
    <v-app-bar
      ref="appbar"
      color="secondary"
      light
      flat
      dense
    >
      <v-app-bar-nav-icon>
        <v-btn icon @click="back">
          <v-icon>navigate_before</v-icon>
        </v-btn>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Shopping cart</v-toolbar-title>
    </v-app-bar>
    <v-row no-gutters>
      <v-col cols="12" md="8">
        <Product
          v-for="product in shopping_cart"
          :key="product._id"
          :product="product"
          @deleteProduct="deleteProduct"
          @updateQty="updateQty"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="ma-4">
          <v-card-text class="text-subtitle-1">
            Subtotal ({{items}} items) ${{subtotal}}
          </v-card-text>
          <v-card-actions class="text-right">
            <v-btn large color="secondary">
              Proceed to checkout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Product from '../components/ProductInCart'
import API from '../services/api'
export default {
  name: 'Cart',
  components: {
    Product
  },
  data () {
    return {
      shopping_cart: []
    }
  },
  async mounted () {
    if (localStorage.getItem('userId')) {
      const userId = localStorage.getItem('userId')
      const { data: { cart } } = await API.getCart({ userId })
      this.shopping_cart = cart
    }
  },
  computed: {
    subtotal: function () {
      return Math.round(this.shopping_cart.reduce((acc, product) => acc + (product.qty * product.price), 0))
    },
    items: function () {
      return this.shopping_cart.reduce((acc, product) => acc + product.qty, 0)
    }
  },
  methods: {
    back () {
      this.$router.push({ name: 'Home' })
    },
    async deleteProduct (productId) {
      const index = this.shopping_cart.findIndex(p => p.productId === productId)
      await API.removeProduct({
        userId: localStorage.getItem('userId'),
        productId: productId
      })
      this.shopping_cart.splice(index, 1)
    },
    async updateQty ({ productId, qty }) {
      const index = this.shopping_cart.findIndex(p => p.productId === productId)
      const product = this.shopping_cart.find(p => p.productId === productId)
      await API.updateCart({
        userId: localStorage.getItem('userId'),
        productId,
        qty
      })
      product.qty = qty
      this.shopping_cart.splice(index, 1, product)
    }
  }
}
</script>

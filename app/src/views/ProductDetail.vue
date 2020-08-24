<template>
  <div v-resize="onResize">
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
      <v-toolbar-title>Product Detail</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-badge class="mr-4" color="primary" :content="shopping_cart.length.toString()">
        <v-btn icon small @click="openCart">
          <v-icon>shopping_cart</v-icon>
        </v-btn>
      </v-badge>
    </v-app-bar>
    <v-row no-gutters>
      <v-col cols="12" md="5" class="pa-4">
        <v-card height="100%">
          <v-img :src="product.image"  :max-height="`${imageHeight}px`" contain/>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card height="100%" flat class="pa-4">
          <v-card-title class="primary--text text-h5">
            <span class="text-center">{{product.title}}</span>
          </v-card-title>
          <v-card-subtitle>
            <hr/>
            <div class="d-block">
              <v-icon v-for="star in product.rating" :key="star" color="secondary">mdi-star</v-icon>
            </div>
            <span class="text-h5">${{ product.price }}</span>
          </v-card-subtitle>
          <v-card-text>
            <span>{{product.description}}</span>
          </v-card-text>
          <v-card-actions class="d-flex align-center justify-center">
            <v-row class="align-center justify-center">
                <v-col cols="6" sm="4" md="4">
                  <v-btn large color="secondary" @click="addToCart" :loading="loading">
                    <v-icon>shopping_cart</v-icon>
                    Add to card
                  </v-btn>
                </v-col>
                <v-col cols="6" sm="4" md="4" lg="4" class="align-center justify-center">
                  <v-text-field value="1" type="number" placeholder="Qty" v-model="qty"/>
                </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="error" app bottom color="error">
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click.stop="error = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="success" app bottom color="secondary">
      Added to Cart!
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click.stop="success = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import API from '../services/api'
export default {
  name: 'ProductDetail',
  data () {
    return {
      product: {},
      imageHeight: 0,
      loading: false,
      error: false,
      success: false,
      errorMessage: '',
      cart: 0,
      qty: 0,
      shopping_cart: []
    }
  },
  async mounted () {
    if (!this.$route.params.product) {
      this.$router.push({ name: 'Home' })
    }
    if (localStorage.getItem('userId')) {
      const userId = localStorage.getItem('userId')
      const { data: { cart } } = await API.getCart({ userId })
      this.shopping_cart = cart
    }
    this.product = this.$route.params.product
    await this.$nextTick()
    this.onResize()
  },
  methods: {
    openCart () {
      this.$router.push({ name: 'Cart' })
    },
    back () {
      this.$router.push({ name: 'Home' })
    },
    onResize () {
      const fullHeight = window.innerHeight
      const headerHeight = this.$refs.appbar.$el.clientHeight
      this.imageHeight = fullHeight - headerHeight - 16
    },
    async addToCart () {
      try {
        this.loading = true
        let userId
        // Validate the userId field autogenerate in localStorage or generate new userId
        if (!localStorage.getItem('userId')) {
          const { data: { user: { _id: id } } } = await API.getUserId()
          userId = id
          localStorage.setItem('userId', userId)
        } else {
          userId = localStorage.getItem('userId')
        }
        await API.addProductToCart({ userId, productId: this.product._id, qty: this.qty })

        // VALIDATE IF THIS PRODUCT EXIST IN THE CART
        const flat = this.shopping_cart.some(p => p.productId === this.product._id)
        if (!flat) {
          this.shopping_cart.push({
            productId: this.product._id,
            image: this.product.image,
            price: this.product.price,
            qty: this.qty,
            title: this.product.title
          })
        }
        this.success = true
      } catch (error) {
        this.error = true
        this.errorMessage = error.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

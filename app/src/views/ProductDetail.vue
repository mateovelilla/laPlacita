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
      <!-- TODO: cart -->
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
          <v-card-actions>
            <v-btn  large color="secondary">
              <v-icon>shopping_cart</v-icon>
              Add to card
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data () {
    return {
      product: {},
      imageHeight: 0
    }
  },
  mounted () {
    if (!this.$route.params.product) {
      this.$router.push({ name: 'Home' })
    }
    this.product = this.$route.params.product
    this.onResize()
  },
  methods: {
    back () {
      this.$router.push({ name: 'Home' })
    },
    onResize () {
      const fullHeight = window.innerHeight
      const headerHeight = this.$refs.appbar.$el.clientHeight
      this.imageHeight = fullHeight - headerHeight - 16
      console.log(this.imageHeight)
      // this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    }
  }
}
</script>

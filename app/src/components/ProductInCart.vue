<template>
  <div>
    <v-row class="pa-4">
      <v-col cols="2">
        <v-img :src="product.image"></v-img>
      </v-col>
      <v-col cols="4">
        <span class="primary--text text-subtitle-2">{{product.title}}</span>
        <div class="d-flex d-inline-block justify-center align-center">
          <v-text-field
            v-model="qty"
            class="d-inline"
            flat type="number"
            min="1"
            :rules="[numberRule]"
            required
          >
            <template v-slot:prepend-inner>
              QTY:
            </template>
          </v-text-field>
        </div>
      </v-col>
      <v-col cols="4" class="text-right">
        <span class="primary--text text-h6 font-weight-bold">
          ${{ product.price }}
        </span>
        <v-btn icon @click="deleteProduct">
          <v-icon>close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  name: 'ProductInCart',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      qty: 0,
      numberRule: v => {
        if (Number.isInteger(v)) return true
        if (!isNaN(parseFloat(v)) && v >= 1 && v <= 999) return true
        return 'The number is not valid!'
      }
    }
  },
  mounted: function () {
    this.qty = Number(this.product.qty)
  },
  watch: {
    qty: function (qty) {
      if (!isNaN(qty) && parseInt(qty) > 0) {
        const { productId } = this.product
        this.$emit('updateQty', {
          productId,
          qty: parseInt(qty)
        })
      }
    }
  },
  methods: {
    deleteProduct () {
      this.$emit('deleteProduct', this.product.productId)
    }
  }
}
</script>

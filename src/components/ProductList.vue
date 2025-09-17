<script setup>
  defineProps(['products'])

    //助教的，const props = defineProps({ 
  // products: { 
  // type:Array, 
  // required:ture,
  // }, 
  // })

  const emit = defineEmits(['add-to-cart'])
  
  //const handleAddCart = (product) =>{ 
  // emit('add-to-cart',product) 
  // showNotification(`商品 $(product.name) 已加入購物車`)
  // }; 
  // 點 購物車就觸發emit 的add to cart事件，並且把商品傳到函示內

  // 助教通知元件: const showNotification = inject('showNotification')
</script>

<template>
  
  <div class="col-md-4 mb-4" v-for="product in products" :key="product.id">
                              <!-- v-for 迴圈，子元件PList引入 產品 到CartView的商品列表，id 是唯一值，作為key最適合 -->
    <div class="card h-100">
      <img :src="product.imgURL" class="card-img-top" />   <!-- 圖片連結 :src="product.imgURL" -->
      <div class="card-body">
        <h5 class="card-title">{{ product.title }}</h5>    <!-- 產品名稱 > {{ product.title }} < -->
        <p class="card-text">{{ product.content }}</p>     <!-- 產品描述 > {{ product.content }} < -->
        <p class="fw-bold text-primary">$ {{ product.price }}</p> <!-- 產品價錢 > $ {{ product.price }} < -->
        <button class="btn btn-success w-100" @click="emit('add-to-cart', product)">
          加入購物車
        </button>
        <!-- 助教寫法: @click= "handleAddCart(product)" 去檢視網頁是否控制區有顯示資料 (有就代表子元件已成功傳到父元件去) -->
      </div>
    </div>
  </div>
</template>
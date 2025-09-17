<script setup>
// defineProps(['carts'])
const emit = defineEmits(['remove-to-cart'])

// 助教寫法:showNotification = inject('showNotification')
// 助教寫法:handleRemoveCart = (item)=>{
//          emit('remove-to-cart',item)
//          showNotification(`已移除 ${item.name}`) }
// 多handleRemoveCart做載入


import { computed, toRefs } from 'vue'
const props = defineProps({ carts: Array })
// 助教寫法: const props = defineprops({
//          carts:{
//                  type:Array,
//                  required:true,
//                  }, })
                  

const { carts } = toRefs(props)

const totalPrice = computed(() =>
  carts.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)


</script>

<template>

  <!-- <div v-if="cartItem.length === 0" >購物車是空的</div>  我寫在CartView 內容-->

  <ul class="list-group mb-3"> <!-- ... v-for 都包在li 等於內容區塊 -->
    <li  
      class="list-group-item d-flex justify-content-between align-items-center"
      v-for="cartItem in carts"
      :key="cartItem.id"
    >
      <div>
        <h6 class="my-0">{{ cartItem.title }}</h6>     <!-- 產品名稱 > {{ cartItem.title }} < -->
        <small class="text-muted">數量：{{ cartItem.quantity }}</small> <!-- 數量 > {{ cartItem.quantity }} < -->
      </div>
      <div>
        <span class="text-muted">${{ cartItem.price }}</span>  
        
        <!-- 助教寫法 : 金額 = 數量 * 價格 > {{ cartItem.quantity * cartItem.price }} < -->
        <button class="btn btn-sm btn-outline-danger ms-2" @click="emit('remove-to-cart', cartItem)">  
                                                           <!-- 觸發 handleRemoveCart的事件 
                                                                助教寫法: @click="handleRemoveCart(item)"-->
          移除
        </button>
      </div>
    </li>
  </ul>

  <div>
    <!-- ... 購物車 items ... -->
    <div class="total">總價：{{ totalPrice }} 元</div>
  </div>
 
<!-- {{ carts }} 可以測試是否能正常顯示在畫面上 -->
</template>
<script setup>
import { inject } from 'vue'
const notifications = inject('notifications')
const removeNotification = inject('removeNotification')
</script>

<template>
  <div v-if="notifications.length" class="position-fixed top-0 end-0 p-3" style="z-index: 1050">
    <!-- 助教寫法 v-if="notificationState.isShow"  
         CartView的 message:'' isShow:false, 如果是false 就不顯示 ，空值--> 
    <div
      v-for="n in notifications"
      :key="n.id"
      class="toast show align-items-center border-0"
      :class="`text-white bg-${n.type}`"
    >
      <div class="d-flex">
        <div class="toast-body">{{ n.message }}</div> <!-- 助教寫法: {{ notificationState.message }} -->
        <button
          @click="removeNotification(n.id)"
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
        ></button>
      </div>
    </div>
  </div>
</template>

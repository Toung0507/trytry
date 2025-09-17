<template>
  <!-- 商品列表 -->
        <div class="list-group">
          <a href.prevent="#" class="list-group-item list-group-item-action"
          v-for="item in data" :key="item.id"
          @click="emit('addItem', item)"
          >
          <!-- @click="addItem(item)" -->
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ item.name }}</h5>
              <small>${{ item.price }}</small>
            </div>
            <p class="mb-1">{{ item.description }}</p>
          </a>

        </div>
</template>
<script setup>
defineProps(['data'])
const emit = defineEmits(['addItem'])

</script>
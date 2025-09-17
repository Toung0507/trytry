<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <!-- | <RouterLink to="/">Home</RouterLink> | -->
  <RouterLink to="/">About</RouterLink> |
  <RouterLink to="/SeconView">第1周</RouterLink> |
  <RouterLink to="/ReviewView">第2周</RouterLink> |
  <RouterLink to="/WeekThree">第3周</RouterLink> |
  <RouterLink to="/TodoView">簡易註冊</RouterLink> |
  <RouterLink to="/FifthView">登入註冊</RouterLink> |
  <RouterLink to="/SpView">進階元件購物車</RouterLink> |
  <!-- <RouterLink to="/Login">終極登入頁</RouterLink> |
        <RouterLink to="/Register">終極註冊頁</RouterLink> | -->
  <RouterLink to="/ToDoListView">終極ToDo代辦清單</RouterLink> |


  <RouterView />

  <!-- <router-view /> -->


</template>

<style></style>
<template>
  <div class="flex flex-col justify-center md:p-8 gap-[24px]">
    <h2 class="text-2xl font-bold">註冊帳號</h2>
    <div class="w-full flex flex-col gap-2">
      <label for="email" class="font-bold">Email</label>
      <input
        type="text"
        name="email"
        placeholder="請輸入Email"
        class="w-full px-[16px] py-[12px] rounded-[10px]"
        v-model="SignUpData.email"
      />
      <div class="text-danger">{{ emailError }}</div>
    </div>
    <div class="w-full flex flex-col gap-2">
      <label for="name" class="font-bold">您的暱稱</label>
      <input
        type="text"
        name="name"
        placeholder="請輸入暱稱"
        class="w-full px-[16px] py-[12px] rounded-[10px]"
        v-model="SignUpData.nickname"
      />
      <div class="text-danger">{{ nameError }}</div>
    </div>
    <div class="w-full flex flex-col gap-2">
      <label for="password" class="font-bold">密碼</label>
      <input
        type="password"
        name="password"
        placeholder="請輸入密碼"
        class="w-full px-[16px] py-[12px] rounded-[10px]"
        v-model="SignUpData.password"
      />
      <div class="text-danger">{{ passwordError }}</div>
    </div>
    <div class="w-full flex flex-col gap-2">
      <label for="retypepassword" class="font-bold">再次輸入密碼</label>
      <input
        type="password"
        name="retypepassword"
        placeholder="請輸入密碼"
        class="w-full px-[16px] py-[12px] rounded-[10px]"
        v-model="retypepassword"
      />
      <div class="text-danger">{{ passwordError }}</div>
    </div>
    <button
      @click="SignUpAction"
      class="mx-auto font-bold bg-secondary text-white py-[12px] px-[48px] rounded-[10px]"
    >
      註冊帳號
    </button>
    <button class="mx-auto font-bold py-[12px] px-[48px] rounded-[10px]" @click="changeLoginView">
      登入
    </button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useTodolistStore } from '@/stores/todoList'
import { storeToRefs } from 'pinia'

const api = 'https://todolist-api.hexschool.io/'
const todolistStore = useTodolistStore()
const { loading } = storeToRefs(todolistStore)

const SignUpData = ref({
  email: '',
  password: '',
  nickname: '',
})

const retypepassword = ref('')
const emailError = ref('')
const nameError = ref('')
const passwordError = ref('')
const SignUpRes = ref('')

const SignUpAction = async () => {
  let hasError = false

  if (SignUpData.value.email === '') {
    emailError.value = '請輸入信箱!'
    hasError = true
  } else {
    emailError.value = ''
  }

  if (SignUpData.value.nickname === '') {
    nameError.value = '請輸入暱稱!'
    hasError = true
  } else {
    nameError.value = ''
  }

  if (SignUpData.value.password !== retypepassword.value) {
    passwordError.value = '兩次輸入密碼不一致，請確認!'
    hasError = true
  } else if (SignUpData.value.password.length < 6) {
    passwordError.value = '密碼長度不足 6 個字'
    hasError = true
  } else {
    passwordError.value = ''
  }

  if (hasError) return

  loading.value = true

  // 打註冊 api
  try {
    await axios.post(`${api}users/sign_up`, SignUpData.value)
    SignUpRes.value = '註冊成功，請嘗試登入'
    alert(SignUpRes.value)
    emit('changeLoginView')
  } catch (err) {
    if (err.response && err.response.data) {
      const data = err.response.data
      alert(data.message)
    } else {
      alert(err.message)
    }
  }
  loading.value = false
}

const emit = defineEmits(['changeLoginView'])
const changeLoginView = () => {
  emit('changeLoginView')
}
</script>
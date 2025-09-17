<template>
              <div class="inputBox">
                  <input type="text" placeholder="請輸入待辦事項" v-model="newTodo">
                  <a href="#" @click.prevent="handleAddTodo">
                    <i class="fa fa-plus"></i>
                  </a>
                </div>
</template>

<script setup>
import { ref } from 'vue'


  const newTodo = ref();
  const emit = defineEmits(['add-todo'])
  const handleAddTodo = () => {
    emit('add-todo', newTodo.value)
    newTodo.value = '';  // 清空文字寫法
  }

</script>
































<!-- 




<template>
  <div class="flex flex-col justify-center p-8 lg:p-[60px] gap-[24px]">
    <h2 class="text-center text-2xl font-bold">最實用的線上代辦事項服務</h2>
    <div class="w-full flex flex-col gap-2">
      <label for="email" class="font-bold">Email</label>
      <input
        type="text"
        name="email"
        placeholder="請輸入Email"
        class="w-full px-[16px] py-[12px] rounded-[10px]"
        v-model="loginData.email"
      />
      <div class="text-danger">{{ emailError }}</div>
    </div>
    <div class="w-full flex flex-col gap-2">
      <label for="password" class="font-bold">密碼</label>
      <input
        type="password"
        name="password"
        placeholder="請輸入密碼"
        class="w-full px-[16px] py-[12px] rounded-[10px]"
        v-model="loginData.password"
      />
      <div class="text-danger">{{ passwordError }}</div>
    </div>
    <button
      @click="loginAction"
      class="mx-auto font-bold bg-secondary text-white py-[12px] px-[48px] rounded-[10px]"
    >
      登入
    </button>
    <button class="mx-auto font-bold py-[12px] px-[48px] rounded-[10px]" @click="changeLoginView">
      註冊帳號
    </button>
  </div>
</template>





<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { useTodolistStore } from '@/stores/todoList'
import { storeToRefs } from 'pinia'

const api = 'https://todolist-api.hexschool.io/'

const loginData = ref({
  email: '',
  password: '',
})

const loginRes = ref('')

const emailError = ref('')
const passwordError = ref('')

const userStore = useUserStore()
const todolistStore = useTodolistStore()
const { loading } = storeToRefs(todolistStore)

const loginAction = async () => {
  let hasError = false

  if (loginData.value.email === '') {
    emailError.value = '請輸入信箱!'
    hasError = true
  } else {
    emailError.value = ''
  }

  if (loginData.value.password === '') {
    passwordError.value = '請輸入密碼!'
    hasError = true
  } else {
    passwordError.value = ''
  }

  if (hasError) return

  loading.value = true
  try {
    const response = await axios.post(`${api}users/sign_in`, loginData.value)
    // 把 token 與使用者資訊存進 Pinia
    userStore.setUser(response.data.nickname, response.data.token)

    document.cookie = `customTodoToken=${response.data.token};path=/`
    document.cookie = `nickname=${response.data.nickname}; path=/;`
    loginRes.value = '登入成功'
    alert(loginRes.value)
    setTimeout(() => {
      router.push('/todolist')
    }, 0)
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

onMounted(() => {
  // 從 cookie 讀取 token 與 nickname
  userStore.initUser()

  if (userStore.isLoggedIn) {
    // 已登入就直接跳轉
    router.push('/todolist')
  }
})
</script> -->

<template> 
                   <li>
                      <label class="todoList_label">
                        <input 
                        class="todoList_input" 
                        type="checkbox" 
                        value="true"  
                        :checked="todo.status"
                        @change="handleStatusChange">
                        <span> {{ todo.content }} </span>  
                        <!-- 傳遞文字信息進入 ex:把冰箱發霉的檸檬拿去丟 -->
                      </label>
                      <a href="#"  @click="handleRemoveTodo(todo.id)">
                        <i class="fa fa-times"></i>
                      </a>
                    </li>
        <!-- 切到剩下一塊 -->
        
</template>

<script setup>

  const props = defineProps({
    todo : {
    type : Object, // 傳單一的Todo 進來，所以是物件
    required : true,
    },
  })

  const emit = defineEmits(['remove-todo','update-status'])
  const handleRemoveTodo = (id) => {
    emit ('remove-todo',id)
  } 


  const handleStatusChange = (event) => {
  const updatedStatus = event.target.checked
  emit('update-status', {
    id: props.todo.id,
    status: updatedStatus
  })
}

</script>






<!-- 

<template>
  <div class="w-full flex justify-between items-center px-[34px] py-[16px]">
    <img src="https://ch933114.github.io/vue-final-project/assets/logo_lg-B-R8YQ67.png" alt="logo照片" class="w-[200px] md:w-auto" />
    <div class="flex gap-8">
      <span v-if="user?.nickname" class="hidden md:block font-bold"
        >{{ user.nickname }} 的代辦</span
      >
      <button class="font-bold" @click="logoutAction">登出</button>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import router from '@/router'
const userStore = useUserStore()
const { logout } = userStore
const { user } = storeToRefs(userStore)

const logoutAction = () => {
  // 清空 store 與 cookie
  logout()
  // 跳轉回登入頁
  router.push('/')
}
</script> -->


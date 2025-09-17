<template>
    <!-- ToDo List -->
    <div id="todoListPage" class="bg-half">
          <nav>
            <h1><a href="#">Online Todo List</a></h1>
            <ul>
              <li class="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
              <li><a href="#loginPage">登出</a></li>
            </ul>
          </nav>
          <div class="conatiner todoListPage vhContainer">
            <div class="todoList_Content">
              <LoginForm @add-todo="addTodo"></LoginForm>    <!-- 引入 components 的 LoginForm -->
              <todoList v-if="todos.length" :todos="todos" @remove-todo="removeTodo"></todoList>      <!-- 引入 components 的 todoList -->
              <p v-else>尚無代辦事項</p>
<!-- 
              v-if = XXX.length 有出現長度 不論數字/文字的長度就show出顯示
              v-else = 否則就顯示尚無代辦事項 -->
            </div>
      </div>
    </div>

</template>


<script setup>
import LoginForm from '@/components/NewToDo/LoginForm.vue';  // 上面的引入，下面會自動做引入import  
import todoList from '@/components/NewToDo/todoList.vue';    // 第二次就不會自動跳出來，需要手動引入

import { ref } from 'vue'

// 響應式資料

const todos = ref([   // 可以先註解掉，查看 if + else 是否符合條件
  { id: 1, content: "把冰箱發霉的檸檬拿去丟", status: false }, 
  { id: 2, content: "打電話叫媽媽匯款給我", status: true },
])


const addTodo = (content)=>{
  if(content.trim() !== ''){
    todos.value.push({
      id: Date.now(),
      content,
      status:false,
    })
  }
}

const removeTodo = (id) => {
  todos.value = todos.value.filter((t)=> t.id !== id)
}
 


</script>
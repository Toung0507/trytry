<template>
  <div class="todoList_list">
                <ul class="todoList_tab">
                  <li><a href="#" :class="{active : filterStatus === 'all'}" @click="filterStatus = 'all'">全部</a></li>
                  <li><a href="#" @click="filterStatus = 'incomplited'" :class="{active : filterStatus === 'incomplited'}">待完成</a></li>
                  <li><a href="#" @click="filterStatus = 'complited'" :class="{active : filterStatus === 'complited'}">已完成</a></li>
                </ul>
                <!-- {{ filterStatus }}   -->
                <!-- 確認畫面是否有顯示 all / incomplited / complited -->
                
                <div class="todoList_items">
                  <ul class="todoList_item">
                    <TodoListHeader  
                      v-for="todo in filteredTodos" 
                      :key="todo.id" 
                      :todo="todo" 
                      @remove-todo="emit('removeTodo',$event)"
                      ></TodoListHeader>

                  </ul>
                  <div class="todoList_statistics">
                    <p> {{ incompleteTodos.length }} 個未完成項目</p>
                  </div>
                </div>
              </div>
   <!-- {{ todos }}   -->
   <!-- 如果 {{ todos }}  沒顯示文字，代表剛步驟有打錯字 -->
</template>



<script setup>
import { computed, ref } from 'vue'
import TodoListHeader from './todoListHeader.vue';

const props = defineProps({
  todos:{
    type:Array,
    required:true,
  },
})

const emit = defineEmits (['remove-todo'])

const filterStatus = ref('all')
const filteredTodos = computed (() =>{
  switch (filterStatus.value) {
    case 'incomplited':
       return props.todos.filter(t => !t.status)
    case 'complited':
       return props.todos.filter(t => t.status)
    default:
      return props.todos
  }
})

const incompleteTodos = computed(() => props.todos.filter(t => !t.status))
</script>




















<!-- 
<template>
  <div class="max-w-[960px] mx-auto p-4">
    <div class="flex justify-between bg-white rounded-[10px] overflow-hidden shadow-md">
      <input
        type="text"
        placeholder="新增待辦事項"
        class="px-[16px] py-[12px] w-full focus:outline-none"
        v-model="newTodo"
      />
      <button
        class="text-white text-xl bg-black px-3 py-1 m-2 rounded-[5px]"
        @click="addTodoHandler(newTodo)"
      >
        +
      </button>
    </div>
    <div
      v-if="todoData.length !== 0"
      class="flex flex-col items-center mt-[16px] rounded-[10px] overflow-hidden bg-white shadow-md"
    >
      <div class="flex w-full">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="currentTab = tab.value"
          class="w-full px-[16px] py-[16px] md:px-[48px] md:py-[16px] font-bold"
          :class="currentTab === tab.value ? 'border-b-4 border-b-black' : ''"
        >
          {{ tab.label }}
        </button>
      </div>
      <div class="w-full">
        <ul>
          <li class="flex justify-between mx-[24px]" v-for="item in filteredTodos" :key="item.id">
            <div class="flex items-center gap-2 w-full border-b-2 py-[24px]">
              <input
                type="checkbox"
                v-model="item.status"
                @change="toggleStatus(item)"
                class="w-[20px] h-[20px]"
              /> -->

              <!-- 編輯中顯示 input，一般狀態顯示 p -->
              <!-- <template v-if="item.isEditing">
                <input v-model="item.content" class="border w-[80%] px-2 py-1 rounded" />
              </template>
              <template v-else>
                <p :class="item.status ? 'text-gray-400 line-through' : ''">{{ item.content }}</p>
              </template>
            </div> -->

            <!-- 按鈕區 -->
            <!-- <div class="flex gap-2 items-center">
              <button
                v-if="item.isEditing"
                @click="saveEdit(item)"
                class="p-[8px] h-[40px] bg-green-500 text-white rounded"
              >
                SAVE
              </button>
              <button
                v-else
                @click="editTodo(item)"
                class="p-[8px] h-[40px] bg-blue-500 text-white rounded"
              >
                EDIT
              </button>
              <button
                @click="removeTodo(item)"
                class="py-[8px] px-[16px] h-[40px] bg-red-500 text-white rounded"
              >
                DELETE
              </button>
            </div>
          </li>
        </ul>
        <div class="flex justify-between mx-[24px]">
          <p class="flex items-center gap-2 w-full py-[24px] font-bold">
            {{ undoneTodo }} 個待完成項目
          </p>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center p-[60px]">
      <p class="font-bold">目前尚無待辦事項</p>
      <img src="https://ch933114.github.io/vue-final-project/assets/empty_deco-BU8GQkiF.png" alt="無待辦插圖" />
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import { useTodolistStore } from '../../stores/todoList'
import { storeToRefs } from 'pinia'

const todoListStore = useTodolistStore()
const { addTodo, removeTodo, fetchTodos, toggleStatus, updateTodo } = todoListStore
const { todoData, undoneTodo } = storeToRefs(todoListStore)
const newTodo = ref('')

const editTodo = (item) => {
  item.isEditing = true
}

const saveEdit = async (item) => {
  try {
    await updateTodo(item)
    item.isEditing = false
  } catch (err) {
    console.error(err)
  }
}

const tabs = [
  { label: '全部', value: 'all' },
  { label: '待完成', value: 'pending' },
  { label: '已完成', value: 'done' },
]

const addTodoHandler = (item) => {
  if (item.trim() === '') {
    window.alert('請填寫待辦事項內容')
    return
  }
  addTodo(item)
  newTodo.value = ''
}

const currentTab = ref('all')

const filteredTodos = computed(() => {
  if (currentTab.value === 'pending') {
    return todoData.value.filter((item) => item.status === false)
  } else if (currentTab.value === 'done') {
    return todoData.value.filter((item) => item.status === true)
  } else {
    return todoData.value
  }
})

onMounted(() => {
  fetchTodos()
})
</script> -->
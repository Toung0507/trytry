import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useUserStore } from './user'
import axios from 'axios'

export const useTodolistStore = defineStore('todoList', () => {
  const loading = ref(false)
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  const url = 'https://todolist-api.hexschool.io'
  const todoData = ref([])

  // 取得 todos
  const fetchTodos = async () => {
    loading.value = true
    try {
      const res = await axios.get(`${url}/todos/`, {
        headers: {
          Authorization: `${token.value.trim()}`,
        },
      })
      todoData.value = res.data.data || []
    } catch (err) {
      console.error('Error:', err.response?.data || err.message)
    }
    loading.value = false
  }

  // 新增 todo
  const addTodo = async (item) => {
    loading.value = true
    try {
      const res = await axios.post(
        `${url}/todos/`,
        { content: item },
        {
          headers: {
            Authorization: `${token.value.trim()}`,
          },
        },
      )
      todoData.value.push(res.data.newTodo)
    } catch (err) {
      console.error('Error:', err.response?.data || err.message)
    }
    loading.value = false
  }

  // 移除 todo
  const removeTodo = async (item) => {
    loading.value = true
    try {
      await axios.delete(`${url}/todos/${item.id}`, {
        headers: {
          Authorization: `${token.value.trim()}`,
        },
      })
      todoData.value = todoData.value.filter((a) => a.id !== item.id)
    } catch (err) {
      console.error('Error:', err.response?.data || err.message)
    }
    loading.value = false
  }

  // 修改 todo 完成狀態
  const toggleStatus = async (item) => {
    loading.value = true
    try {
      const res = await axios.patch(
        `${url}/todos/${item.id}/toggle`,
        {},
        {
          headers: {
            Authorization: `${token.value.trim()}`,
          },
        },
      )

      const updatedTodo = res.data
      todoData.value = todoData.value.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      )
    } catch (err) {
      console.error('Error:', err.response?.data || err.message)
    }
    loading.value = false
  }

  // 更新 todo 的 content
  const updateTodo = async (item) => {
    loading.value = true
    try {
      await axios.put(
        `${url}/todos/${item.id}`,
        { content: item.content },
        {
          headers: {
            Authorization: `${token.value.trim()}`,
          },
        },
      )
      const target = todoData.value.find((a) => a.id === item.id)
      if (target) target.content = item.content
    } catch (err) {
      console.error(err)
    }
    loading.value = false
  }

  // 計算未完成 todos 數量
  const undoneTodo = computed(() => {
    return todoData.value.filter((a) => a.status === false).length
  })

  return {
    todoData,
    addTodo,
    removeTodo,
    undoneTodo,
    fetchTodos,
    toggleStatus,
    updateTodo,
    loading,
  }
})
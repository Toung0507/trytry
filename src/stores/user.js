import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
    return null
  }

  const token = ref(getCookie('customTodoToken'))
  const user = ref(getCookie('nickname') ? { nickname: getCookie('nickname') } : null)

  const isLoggedIn = computed(() => !!token.value)

  const setUser = (userData, userToken) => {
    user.value = { nickname: userData }
    token.value = userToken
    document.cookie = `customTodoToken=${userToken}; path=/;`
    document.cookie = `nickname=${userData.nickname}; path=/;`
  }

  const logout = () => {
    user.value = null
    token.value = null
    document.cookie = 'customTodoToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'nickname=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }

  const initUser = () => {
    const savedToken = getCookie('customTodoToken')
    const nickname = getCookie('nickname') || null
    if (savedToken && nickname) {
      token.value = savedToken
      user.value = { nickname }
    }
  }

  return {
    user,
    token,
    isLoggedIn,
    setUser,
    logout,
    initUser,
    getCookie,
  }
})
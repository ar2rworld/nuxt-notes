export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    username: '',
    userId: '',
    notes: [],
    token: ''
  }),
  actions: {
    async setUser(username: string, id: string) {
      this.username = username
      this.userId = id
    },
    async setToken(token: string) {
      this.token = token
      await this.getNotes()
    },
    async getNotes() {
      const { data } = await useFetch('/api/notes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token,
        },
      })
      this.notes = data
    }
  }
})
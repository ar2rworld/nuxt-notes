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
      const { data } = await useFetch('/back/notes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token,
        },
      })
      this.notes = data
    },
    async deleteNote(noteId: string) {
      await $fetch(`/back/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': this.token,
        },
      })
      
      this.notes = this.notes.filter(note => note._id !== noteId);;
    },
    async updateNote(noteId: string, updates: { name?: string; text?: string }) {
      await $fetch(`/back/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Authorization': this.token,
          'Content-Type': 'application/json'
        },
        body: updates
      })
      
      this.notes = this.notes.map(note => 
        note._id === noteId ? { ...note, ...updates } : note
      )
    }
  }
})
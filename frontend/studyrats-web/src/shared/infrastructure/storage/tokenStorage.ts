const KEY = 'studyrats:token'

export const tokenStorage = {
  get() {
    return localStorage.getItem(KEY)
  },

  set(token: string) {
    localStorage.setItem(KEY, token)
  },

  remove() {
    localStorage.removeItem(KEY)
  },
}
import '@/libs/axios'

export default {
  async login(payload) {
    await this.$http.get('/sanctum/csrf-cookie')
    return this.$http.post('/login', payload)
  },
  logout() {
    return this.$http.post('/logout')
  },
  async forgotPassword(payload) {
    await this.$http.get('/sanctum/csrf-cookie')
    return this.$http.post('/forgot-password', payload)
  },
  getAuthUser() {
    return null
  },
  async resetPassword(payload) {
    await this.$http.get('/sanctum/csrf-cookie')
    return this.$http.post('/reset-password', payload)
  },
  updatePassword(payload) {
    return this.$http.put('/user/password', payload)
  },
  async registerUser(payload) {
    await this.$http.get('/sanctum/csrf-cookie')
    return this.$http.post('/register', payload)
  },
  sendVerification(payload) {
    return this.$http.post('/email/verification-notification', payload)
  },
  updateUser(payload) {
    return this.$http.put('/user/profile-information', payload)
  },
}

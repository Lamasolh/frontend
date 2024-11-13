import getter from './getter'
import mutation from './mutation'
import action from './action'
import state from './state'

export default {
  namespaced: true,
  state,
  getters: getter,
  mutations: mutation,
  actions: action,
}

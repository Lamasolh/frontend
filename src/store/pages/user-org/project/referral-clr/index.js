import state from './state'
import getter from './getter'
// eslint-disable-next-line import/no-cycle
import mutation from './mutation'
import action from './action'

export default {
  namespaced: true,
  state,
  getters: getter,
  mutations: mutation,
  actions: action,
}

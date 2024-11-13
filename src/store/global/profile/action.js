export default {
  getUserData({ state, rootGetters, commit }) {
    // General
    commit('SET_DATA', { key: 'first_name', value: rootGetters['auth/authUser'].first_name })
    commit('SET_DATA', { key: 'first_name_ar', value: rootGetters['auth/authUser'].first_name_ar })
    commit('SET_DATA', { key: 'last_name', value: rootGetters['auth/authUser'].last_name })
    commit('SET_DATA', { key: 'last_name_ar', value: rootGetters['auth/authUser'].last_name_ar })
    commit('SET_DATA', { key: 'email', value: rootGetters['auth/authUser'].email })
    commit('SET_DATA', { key: 'user_name', value: rootGetters['auth/authUser'].user_name })
    commit('SET_DATA', { key: 'avatar', value: rootGetters['auth/authUser'].avatar })
    commit('SET_DATA', {
      key: 'gender',
      value: rootGetters['global/gender'].filter(
        it => it.value === rootGetters['auth/authUser'].gender_id,
      )[0],
    })
    commit('SET_DATA', {
      key: 'gender_id',
      value: rootGetters['auth/authUser'].gender_id,
    })
    commit('SET_DATA', {
      key: 'org',
      value: rootGetters['auth/authUser'].org,
    })
    // info
    commit('SET_DATA', { key: 'bio', value: rootGetters['auth/authUser'].bio })
    commit('SET_DATA', { key: 'date_of_birth', value: rootGetters['auth/authUser'].date_of_birth })
    commit('SET_DATA', {
      key: 'nationality',
      value: rootGetters['global/nationality'].filter(
        it => it.title === rootGetters['auth/authUser'].nationality,
      )[0],
    })
    console.log(state.data)
    console.log(rootGetters['auth/authUser'])
    commit('SET_DATA', { key: 'nationality_id', value: rootGetters['auth/authUser'].nationality })
    commit('SET_DATA', { key: 'address', value: rootGetters['auth/authUser'].address })
    commit('SET_DATA', { key: 'phone', value: rootGetters['auth/authUser'].phone })
    commit('SET_DATA', { key: 'orgdis', value: rootGetters['auth/authUser'].orgdis })
    commit('SET_DATA', { key: 'job_title', value: rootGetters['auth/authUser'].job_title })
    // phone
    const { phone } = rootGetters['auth/authUser']
    const str = phone == null ? null : phone.toString()
    let cnt = null
    if (str == null) {
      cnt = 1
    } else if (str.substring(0, 3) === '961') {
      cnt = 1
    } else if (str.substring(0, 3) === '963') {
      cnt = 2
    }
    state.country.id = cnt
    if (str != null) {
      state.country.text = rootGetters['global/phoneOptions'].filter(
        it => it.value === cnt,
      )[0].text
      state.country.number = str == null ? null : str.substring(3, str.length)
    }
    // Password
    commit('SET_DATA', { key: 'old_password', value: '' })
    commit('SET_DATA', { key: 'new_password', value: '' })
    commit('SET_DATA', { key: 'ret_password', value: '' })
  },
  ResetGenData({ rootGetters, commit }) {
    // General
    commit('SET_DATA', { key: 'first_name', value: rootGetters['auth/authUser'].first_name })
    commit('SET_DATA', { key: 'first_name_ar', value: rootGetters['auth/authUser'].first_name_ar })
    commit('SET_DATA', { key: 'last_name', value: rootGetters['auth/authUser'].last_name })
    commit('SET_DATA', { key: 'last_name_ar', value: rootGetters['auth/authUser'].last_name_ar })
    commit('SET_DATA', { key: 'email', value: rootGetters['auth/authUser'].email })
    commit('SET_DATA', { key: 'user_name', value: rootGetters['auth/authUser'].user_name })
    commit('SET_DATA', { key: 'avatar', value: rootGetters['auth/authUser'].avatar })
    commit('SET_DATA', {
      key: 'gender',
      value: rootGetters['global/gender'].filter(
        it => it.value === rootGetters['auth/authUser'].gender_id,
      ),
    })
    commit('SET_DATA', {
      key: 'gender_id',
      value: rootGetters['auth/authUser'].gender_id,
    })
    commit('SET_DATA', {
      key: 'org',
      value: rootGetters['auth/authUser'].org,
    })
  },
  ResetInfoData({ state, rootGetters, commit }) {
    commit('SET_DATA', { key: 'bio', value: rootGetters['auth/authUser'].bio })
    commit('SET_DATA', { key: 'date_of_birth', value: rootGetters['auth/authUser'].date_of_birth })
    commit('SET_DATA', { key: 'nationality', value: rootGetters['auth/authUser'].nationality })
    commit('SET_DATA', { key: 'nationality_id', value: rootGetters['auth/authUser'].nationality })
    commit('SET_DATA', { key: 'address', value: rootGetters['auth/authUser'].address })
    commit('SET_DATA', { key: 'phone', value: rootGetters['auth/authUser'].phone })
    commit('SET_DATA', { key: 'orgdis', value: rootGetters['auth/authUser'].orgdis })
    commit('SET_DATA', { key: 'job_title', value: rootGetters['auth/authUser'].job_title })
    // phone
    const { phone } = rootGetters['auth/authUser']
    const str = phone == null ? null : phone.toString()
    let cnt = null
    if (str == null) {
      cnt = 1
    } else if (str.substring(0, 3) === '961') {
      cnt = 1
    } else if (str.substring(0, 3) === '963') {
      cnt = 2
    }
    state.country.id = cnt
    if (str != null) {
      state.country.text = rootGetters['global/phoneOptions'].filter(
        it => it.value === cnt,
      )[0].text
      state.country.number = str == null ? null : str.substring(3, str.length)
    }
  },
}

// eslint-disable-next-line import/no-cycle
// import Vue from 'vue'

export default {
  SET_USER(state, userData) {
    state.userData = userData
  },
  ADD_NEWS(state, payload) {
    state.news = []
    payload.forEach(el => {
      state.news.push({
        title: el.news_text,
        type: el.type,
        variant: el.news_variant,
      })
    })
  },
}

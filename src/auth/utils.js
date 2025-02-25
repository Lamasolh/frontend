// eslint-disable-next-line import/no-cycle
import store from '@/store/index'
import ability from '@/libs/acl/ability'

async function getAuth() {
  await store.dispatch('auth/getAuthUser').catch(() => {
    throw new Error('Error')
  })
  return [{ islogedin: false }]
}
/**
 * Return if user is logged in
 * This is completely up to you and how you want to store the token in your frontend application
 * e.g. If you are using cookies to store the application please update this function
 */
// eslint-disable-next-line arrow-body-style
export const isUserLoggedIn = async () => {
  if (store.getters['auth/authUser']) {
    return store.getters['auth/authUser']
  }
  await getAuth()
    .then(() => {
      if (store.getters['auth/authUser']) {
        ability.update(
          JSON.parse(store.getters['auth/authUser'].role_permission),
        )
      }
    })
    .catch(() => {
      throw new Error('Error')
    })

  return store.getters['auth/authUser'] ? store.getters['auth/authUser'] : false
}

export const getUserData = () => store.getters['auth/authUser']

/**
 * This function is used for demo purpose route navigation
 * In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 * Please note role field is just for showing purpose it's not used by anything in frontend
 * We are checking role just for ease
 * NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === 'user') return '/dashboard'
  return { name: 'login' }
}

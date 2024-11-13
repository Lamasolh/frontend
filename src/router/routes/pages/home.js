export default [
  {
    path: '/',
    name: 'home',
    redirect: 'dashboard',
    meta: {
      resource: 'Home',
      action: 'read',
      layout: 'full',
      redirectIfLoggedIn: true,
    },
  },
]

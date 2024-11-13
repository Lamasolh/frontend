import ability from './ability'

export const canNavigate = to => to.matched.some(route => ability.can(route.meta.action || to.params.action || 'read', route.meta.resource || to.params.resource))

/* export const canNavigate = to => {
  console.log(to.params.action)
  console.log(to.params.resource)
  return to.matched.some(route => ability.can(route.meta.action || to.params.action || 'read', route.meta.resource || to.params.resource))
} */

export const _ = undefined

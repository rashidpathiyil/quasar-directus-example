// This file is to check if the user is authenticated or not.
// If the user is authenticated, it will redirect to the dashboard.
// If the user is not authenticated, it will redirect to the login page.
//
import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'src/stores/auth' // Import the auth store
import { Ability } from '@casl/ability';
import { abilitiesPlugin } from '@casl/vue';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, store, router }) => {
  // Pinia Store
  const auth = useAuthStore(store) // Get the auth store
  const ability = new Ability()
  app.use(abilitiesPlugin, ability);

  router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
      // Auth required, but not logged in
      // Try to authenticate with refresh token if it's exists
      auth.refresh().then(() => {
        if (auth.isAuthenticated) {
          ability.update(auth.user_permissions)

          next()
        } else {
          next({
            path: '/auth',
          })
          // OR you can using named route as below
          // next({ name: 'AuthPage', query: { next: to.fullPath } })
        }
      })
    } else {
      // ability.update(auth.user_permissions)
      // No auth required or logged in
      next()
    }
  })
})

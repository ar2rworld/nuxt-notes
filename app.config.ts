export default defineAppConfig({
  ui: {
    notifications: {
      // Position the notifications at the top-right
      position: 'top-right'
    },
    toast: {
      position: 'top-right',
      duration: 3000,
      variants: {
        color: {
          primary: {
            root: 'bg-primary-50 text-primary-500 ring-1 ring-primary-500/10',
            icon: 'text-primary-500',
            progress: 'bg-primary-500'
          },
          secondary: {
            root: 'bg-secondary-50 text-secondary-500 ring-1 ring-secondary-500/10',
            icon: 'text-secondary-500',
            progress: 'bg-secondary-500'
          },
          success: {
            root: 'bg-green-50 text-green-500 ring-1 ring-green-500/10',
            icon: 'text-green-500',
            progress: 'bg-green-500'
          },
          error: {
            root: 'bg-red-50 text-red-500 ring-1 ring-red-500/10',
            icon: 'text-red-500',
            progress: 'bg-red-500'
          },
          warning: {
            root: 'bg-yellow-50 text-yellow-500 ring-1 ring-yellow-500/10',
            icon: 'text-yellow-500',
            progress: 'bg-yellow-500'
          },
          info: {
            root: 'bg-blue-50 text-blue-500 ring-1 ring-blue-500/10',
            icon: 'text-blue-500',
            progress: 'bg-blue-500'
          }
        }
      }
    }
  }
})

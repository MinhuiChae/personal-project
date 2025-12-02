import { useToast } from 'vue-toastification'

export default {
  install(app) {
    const toast = useToast()

    app.config.globalProperties.$notify = {
      success({ message, duration = 2000 }) {
        toast.success(message, { timeout: duration, hideProgressBar: true })
      },
      info({ message, duration = 2000 }) {
        toast.info(message, { timeout: duration, hideProgressBar: true })
      },
      error({ message, duration = 2000 }) {
        toast.error(message, { timeout: duration, hideProgressBar: true })
      },
      snack({ message, duration = 2000 }) {
        toast.success(message, {
          timeout: duration,
          hideProgressBar: true,
          position: 'bottom-center',
        })
      },
    }
  },
}

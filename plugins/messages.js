import Vue from 'vue'

const messagePlugin = {
  install (Vue, options) {
    if (this.installed) {
      return
    }

    this.installed = true

    Vue.prototype.$msg = new Vue() // ToastsBus

    Vue.prototype.$msg.push = function (options, type) {
      if (typeof options === 'string') {
        this.$emit('message', { message: options, type })
      } else {
        this.$emit('message', { ...options, type })
      }
    }

    Vue.prototype.$msg.info = function (options) {
      this.$msg.push(options, 'info')
    }

    Vue.prototype.$msg.success = function (options) {
      this.$msg.push(options, 'success')
    }

    Vue.prototype.$msg.warning = function (options) {
      this.$msg.push(options, 'warning')
    }

    Vue.prototype.$msg.error = function (options) {
      this.$msg.push(options, 'error')
    }
  }
}

Vue.use(messagePlugin);

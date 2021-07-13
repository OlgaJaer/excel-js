import { capitalize } from './utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`)
    }

    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      console.log(method)
      // the same like addEventListener
      if (!this[method]) {
        throw new Error(
            // eslint-disable-next-line max-len
            `Method ${method} is not implemented in ${this.name || ''} Component`)
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method] )
    })
  }

  removeDOMListeners() {
    console.log('removeDOM')
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}
// input => onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}

import { $ } from '@core/dom'
export class Excel {
  constructor(selector, options) {
    // $ - DOM Node
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    console.log(this.components)
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      // DEBUG - make component global
      if (component.name) {
        window['c'+ component.name] = component
      }

      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    console.log(this.components)
    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.components.forEach((component) => component.init())
  }
}

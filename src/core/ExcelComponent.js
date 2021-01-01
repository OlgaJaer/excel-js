import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  // возвращает шаблон компонента
  constructor($root, options = {}) {
    super($root, options.listeners)
  }
  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }
}

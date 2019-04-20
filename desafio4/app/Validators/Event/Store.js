'use strict'

const Antl = use('Antl')

const { rule } = use('Validator')

class Store {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      where: 'required',
      when: [rule('required'), rule('date_format', 'YYYY-MM-DD HH:mm:ss')]
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Store

'use strict'

const Database = use('Database')
const Hash = use('Hash')

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx)

    await trx.commit()

    return user
  }

  async update ({ request, response, auth: { user } }) {
    const data = request.only(['username', 'password', 'password_old'])

    const trx = await Database.beginTransaction()

    if (data.password_old) {
      const isEqual = await Hash.verify(data.password_old, user.password)

      if (!isEqual) {
        return response.status(401).send({
          error: {
            message: 'A senha antiga não é válida'
          }
        })
      }

      if (!data.password) {
        return response.status(401).send({
          error: {
            message: 'Você não informou a nova senha'
          }
        })
      }

      delete data.password_old
    }

    if (!data.password) {
      delete data.password
    }

    user.merge(data, trx)

    await user.save()

    await trx.commit()

    return user
  }
}

module.exports = UserController

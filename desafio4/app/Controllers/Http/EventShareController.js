'use strict'

const moment = require('moment')
moment.locale('pt-br')

const Event = use('App/Models/Event')
const Kue = use('Kue')
const Job = use('App/Jobs/EventShareMail')

class EventShareController {
  async share ({ params, request, response, auth }) {
    const event = await Event.findOrFail(params.events_id)
    const email = request.input('email')

    if (event.user_id !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'Apenas o dono do evento pode compartilhar.'
        }
      })
    }

    event.when = moment(event.when).format('LLLL')

    Kue.dispatch(
      Job.key,
      { email, username: auth.user.username, event },
      { attempts: 3 }
    )

    return response.status(200).send({
      message: `Evento ${event.title} foi compartilhado para o email ${email}`
    })
  }
}

module.exports = EventShareController

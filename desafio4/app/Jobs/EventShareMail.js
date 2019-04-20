'use strict'

const Mail = use('Mail')

class EventShareMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'EventShareMail-job'
  }

  // This is where the work is done.
  async handle ({ email, username, event }) {
    await Mail.send(['emails.event_share'], { username, event }, message => {
      message
        .to(email)
        .from('giovani.generali@gmail.com', 'Giovani Generali')
        .subject(`Evento: ${event.title}`)
    })
  }
}

module.exports = EventShareMail

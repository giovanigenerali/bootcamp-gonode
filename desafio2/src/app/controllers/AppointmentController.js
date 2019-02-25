const sequelize = require('sequelize')

const {
  User,
  Appointment
} = require('../models')

class AppointmentController {
  async index (req, res) {
    const appointments = await Appointment.findAll({
      attributes: [
        'id',
        [sequelize.fn('to_char', sequelize.col('date'), 'DD/MM/YYY às HH24:MI'), 'date']
      ],
      where: {
        user_id: req.session.user.id
      },
      include: [{
        model: User,
        attributes: ['name', 'avatar']
      }],
      order: [
        ['date', 'ASC']
      ]
    })

    return res.render('appointments/index', {
      appointments
    })
  }

  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)

    return res.render('appointments/create', {
      provider
    })
  }

  async store (req, res) {
    const {
      id
    } = req.session.user
    const {
      provider
    } = req.params
    const {
      date
    } = req.body

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    })

    return res.redirect('/app/dashboard')
  }

  async remove (req, res) {
    const appointment = await Appointment.findByPk(req.params.id)
    appointment.destroy()

    return res.json({
      status: true
    })
  }
}

module.exports = new AppointmentController()

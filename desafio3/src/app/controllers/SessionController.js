const User = require('../models/User')

class SessionController {
  async store (req, res) {
    const {
      email,
      password
    } = req.body

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        error: 'Invalid params'
      })
    }

    const user = await User.findOne({
      email
    })

    if (!user) {
      return res.status(400).json({
        error: 'User not found'
      })
    }

    if (!await user.compareHash(password)) {
      return res.status(400).json({
        error: 'Invalid password'
      })
    }

    return res.json({
      user,
      token: User.generateToken(user)
    })
  }
}

module.exports = new SessionController()

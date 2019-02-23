const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoscape: true,
  express: app,
  watch: true
})

app.use(
  express.urlencoded({
    extended: false
  })
)

app.set('view engine', 'njk')

const checkAgeMiddleware = (req, res, next) => {
  const {
    age
  } = req.query

  if (!age || isNaN(age)) {
    return res.redirect('/?error=invalid_age')
  }
  return next()
}

app.get('/', (req, res) => {
  const {
    error
  } = req.query

  return res.render('index', {
    error
  })
})

app.get('/major', checkAgeMiddleware, (req, res) => {
  const {
    age
  } = req.query

  return res.render('major', {
    age
  })
})

app.get('/minor', checkAgeMiddleware, (req, res) => {
  const {
    age
  } = req.query

  return res.render('minor', {
    age
  })
})

app.post('/check', (req, res) => {
  const {
    age
  } = req.body

  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else if (age > 0 && age < 18) {
    return res.redirect(`/minor?age=${age}`)
  } else {
    return res.redirect('/?error=invalid_age')
  }
})

app.listen(3000)

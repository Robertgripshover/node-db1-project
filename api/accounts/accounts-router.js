const router = require('express').Router()

const midWare = require('./accounts-middleware')

const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  try {
      const accounts = await Account.getAll() //using the getall
      res.json(accounts) //using json to send the client back all of the accounts
  } catch (err) {
    next({ status: 422, message: 'this is horrible' }) 
  }
})

router.get('/:id', midWare.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try {
      res.json('get account by id')
  } catch (err) {
    next(err)
  }
})

router.post('/', midWare.checkAccountPayload, midWare.checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  try {
      res.json('post account')
  } catch (err) {
    next(err)
  }
})

router.put('/:id', midWare.checkAccountId, midWare.checkAccountPayload, midWare.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try {
      res.json('update account')
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', midWare.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try {
      res.json('delete account')
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;

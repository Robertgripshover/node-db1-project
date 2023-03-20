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

router.get('/:id', midWare.checkAccountId, async (req, res, next) => {
  res.json(req.account)
  //all the code below is not needed since the checkAccountId 
  //middleware is doing all that work
  // try {
  //   const account = await Account.getAll(req.params.id)
  //   res.json(account)
  // } catch (err) {
  //   next(err)
  // }
  //^^^ Therefore the above code that I have commented out is not
  //needed becuase the middlware is doing it all
})

router.post('/',
  midWare.checkAccountPayload,
  midWare.checkAccountNameUnique,
  async (req, res, next) => {
  try {
      const newAccount = await Account.create(req.body)
      res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})

router.put('/:id',
  midWare.checkAccountId,
  midWare.checkAccountPayload,
  midWare.checkAccountId,
  (req, res, next) => {
  // DO YOUR MAGIC
  try {
      res.json('update account')
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', midWare.checkAccountId, async (req, res, next) => {
  try {
      await Account.deleteById(req.params.id)
      res.json(req.account)
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

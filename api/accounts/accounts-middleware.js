
const Account = require('./accounts-model') 


exports.checkAccountPayload = (req, res, next) => {
  const errorMessage = { status: 400 }
  const { name, budget } = req.body
  if (name === undefined || budget === undefined) {
    errorMessage.message = 'name and budget are required'
    next(errorMessage)
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  next()
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id)
    if(!account) {
      next({ status: 404, message: 'not found' })
    } else {
      req.account = account
      next()
    }
  } catch (err) {
     next(err)
  }
}


const Account = require('./accounts-model') 


exports.checkAccountPayload = (req, res, next) => {
  const errorMessage = { status: 400 } //sending back the status code
  const { name, budget } = req.body //descruturing out the name and budget from the body of the request
  if (name === undefined || budget === undefined) {
    errorMessage.message = 'name and budget are required'
    next(errorMessage) 

    //this will spit out the error message if this condition is not met
    //if the condition IS met then it will move onto the next else if and keep checking

  } else if (typeof name !== 'string') {
    errorMessage.message = 'name of account must be a string'
    next(errorMessage)

    //this will spit out the error message if this condition is not met
    //if the condition IS met then it will move onto the next else if and keep checking

  } else if (name.trim().length < 3 || name.trim().length > 100) {
    errorMessage.message = 'name of account must be between 3 and 100'
    next(errorMessage)

    //this will spit out the error message if this condition is not met
    //if the condition IS met then it will move onto the next else if and keep checking

  } else if (typeof budget !== 'number' || isNaN(budget)) {
    errorMessage.message = 'budget of account must be a number'
    next(errorMessage)

    //this will spit out the error message if this condition is not met
    //if the condition IS met then it will move onto the next else if and keep checking

  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  next()
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id) //req.params.id is the id that is sent in the request parameters
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

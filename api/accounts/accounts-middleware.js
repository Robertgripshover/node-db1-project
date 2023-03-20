
const Account = require('./accounts-model') 


const db = require('../../data/db-config')


exports.checkAccountPayload = (req, res, next) => {
  const errorMessage = { status: 400 } //sending back the status code
  const { name, budget } = req.body //descruturing out the name and budget from the body of the request
  if (name === undefined || budget === undefined) {
    errorMessage.message = 'name and budget are required'
    
    //if the condition IS met then it will move onto the next else if and keep checking

  } else if (typeof name !== 'string') {
    errorMessage.message = 'name of account must be a string'
  
    //if the condition IS met then it will move onto the next else if and keep checking

  } else if (name.trim().length < 3 || name.trim().length > 100) {
    errorMessage.message = 'name of account must be between 3 and 100'
  
    //if the condition IS met then it will move onto the next else if and keep checking

  } else if (typeof budget !== 'number' || isNaN(budget)) {
    errorMessage.message = 'budget of account must be a number'
  
    //if the condition IS met then it will move onto the next else if and keep checking

  } else if (budget < 0 || budget > 1000000) {
    errorMessage.message = 'budget of account is to large or to small'
  
    //if the condition IS met then it will move onto the next else if and keep checking

  }

  if (errorMessage.message) {
    next(errorMessage) //this will run if there is an error anywhere in the code
    //and it will spit out the specific error message
  } else {
    next()
  }
  
}



exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existing = await db('accounts').where('name', req.body.name.trim())
    //This above line ^^^ is checking to see if the name in the request body already exists inside the database
    //so, this middlware is actually reaching out to the db and checking around
    //for if that name already exisits.
  } catch (err) {
      next(err)
  }
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

const service = require('../services/confessionService')

// controller acts as a bridge between incoming request and business logic
function createConfession(req, res) {
  // delegate actual logic to service layer to keep controller lightweight
  const result = service.createConfession(req.body)

  // if service returns an error, controller translates it into HTTP response
  if (result.error) {
    return res.status(result.status).json({ msg: result.error })
  }

  // send successful response back to client using data from service
  res.status(result.status).json(result.data)
}

module.exports = {
  createConfession
}
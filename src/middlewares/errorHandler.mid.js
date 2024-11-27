// va en los catch como error
function errorHandler (error, req, res, next) {
  try {
    return res.status(500).json({message: `${req.method} ${req.url} ${error.message}`})
  } catch (error) {
    return next(error)
  }
}

export default errorHandler;
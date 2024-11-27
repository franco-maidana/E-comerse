// va para las rutas erroneas
function pathHandler(req, res, next) {
  return res.json({
    statusCode: 404,
    message: `${req.method} ${req.url} Esta ruta no existe`,
  });
}

export default pathHandler;
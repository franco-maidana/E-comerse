
function isAdmin (req, res, next)  {
  const user = req.user;
  if(user.role === 'ADMIN'){
    return next()
  }else{
    return res.status(404).json({message: " No tienes los permisos de administrador para este sitio "})
  }
}

export default isAdmin
const logger = ((request, response, next) => {
  console.log(request.method)
  console.log(request.path)
  console.log(request.body)
  console.log('------')
  next()//va a la siguiente ruta y no termina su trabajo aca
}) // luego la request sigue por este app, y luego por los de abajo en orden
module.exports = logger
const jwt = require('jsonwebtoken');

let verifyAuth = (req, res, next) => {

  // Leer headers
  const token = req.body.token || req.query.token || req.headers['token'];
  //console.log("TOKEN_BACKEND: ", token);
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    //console.log(decoded)
    if(err) {
      return res.status(401).json({
        mensaje: 'Error de Token',
        err
      })
    }
    else{
        req.decoded = decoded;
        next();
    }

  });
}
module.exports = {verifyAuth};
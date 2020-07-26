import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import User from '../models/user';
import bcrypt from 'bcrypt';
const saltRounds = 10;

//POST register new user
router.post('/signup', async(req,res) =>{
    
  const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password,10)
  })
  
  try {
      const result = await User.create(newUser);
      return res.json(result);

  } catch (error) {
      return res.status(500).json({
          message:'Ocurrio un error.',error
      })
  }
  
});

//POST Login
router.post('/login', async(req, res) => {

    let body = req.body;
    try {
      // Buscamos email en DB
      const user = await User.findOne({email: body.email});
  
      // Evaluamos si existe el usuario en DB
      if(!user){
        return res.status(400).json({
          mensaje: 'Usuario Invalido',
        });
      }
  
    //Evaluamos password
      if( !bcrypt.compareSync(body.password, user.password) ){
        return res.status(400).json({
          mensaje: 'Contraseña Invalido',
        });
      }
      
      // Generar Token
      let token = jwt.sign({
        user_id: user._id
      }, 'SECRET', { expiresIn: 60 * 60 * 24 * 30}) // Expira en 30 días
 
      // Pasó las validaciones
      return res.json({
        user,
        token: token
      })
      
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      });
    }
  
  });

module.exports = router;
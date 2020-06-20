import express from 'express';
const router = express.Router();
import User from '../models/user';
const {verifyAuth} = require('../middlewares/verifyAuth.js');

//GET users listing
router.get('/',verifyAuth, async(req,res) => {
    try {
        console.log("RUTA_USERS: ",req.decoded);
        const user = await User.findOne({ _id: req.decoded.user_id });

        res.status(201).json({
            title: 'Usuario Autorizado',
                user:{
                    email: user.email,
                    name: user.name
                }
        });
        } catch (error) {

            return res.status(401).json({
                title: 'Error'
            });     

        }    
 });
 
 router.get('/a', async(req,res) =>{
    res.send("bien");
 });

module.exports = router;
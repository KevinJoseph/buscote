import express from 'express';
const router = express.Router();
import Request from '../models/request';

//GET users listing
router.get('/', async(req,res) => {   
    try {
        //const user = await User.findOne({ _id: req.decoded.user_id });
        const result = await Request.find({},['_id','search', 'budget','name','email','phone','status','date'], function (err, docs) {});
        console.log(result)
        return res.status(201).json(result);
  
    } catch (error) {
        return res.status(401).json({
            title: 'Error',
            error: error
        });     
    }
 });

 //POST register new user
router.post('/', async(req,res) =>{
    
    const newRequest = new Request({
        search: req.body.search,
        budget: req.body.budget,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        status: '0'
    })
    
    try {
        const result = await Request.create(newRequest);
        return res.json(result);
  
    } catch (error) {
        return res.status(500).json({
            message:'Ocurrio un error.',error
        })
    }
    
  });
  
 
 router.get('/a', async(req,res) =>{
    res.send("bien");
 });

module.exports = router;
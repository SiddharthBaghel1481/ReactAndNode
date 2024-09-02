  const express = require('express');
  const router = express.Router();
  const User = require('../models/databse')


  router.post('/addfriend',async(req,res)=>{

    try{
    const userId = req.query.id;
    const {user} = req.body;
    const giveFriend  =  await User.findById(userId)
    const takeFriend =  await User.findById(user)

    if (!giveFriend || !takeFriend) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if(userId!=user){
     giveFriend.friends.push(takeFriend.email)  
      await giveFriend.save();
    }else{ 
        console.log('2 not equal to n');
      }
    

     return res.json('successfully friend request send!!')
    }catch(err){
      console.log(err, 'err in addfriend')
    }
  })



  
  router.get('/addfriend',async (req,res)=>{
    const id = req.query.id;
    console.log(id,'--userid');
  
   const friendReq =  await User.findById(id)
  return  res.json(friendReq)

  })


  router.delete('/addfriend',async (req,res)=>{
       const id = req.query.id;
    console.log(id,'--userid');
   const friendReq =  await User.findById(id)
    res.json(friendReq)
  })





  module.exports = router;
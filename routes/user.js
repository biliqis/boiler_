const router = require('express').Router()
const user = require('../model/user')
const User = require('../model/user')
const bcrypt = require("bcrypt");
const e = require('express');

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your account!");
    }
  });

  router.delete("/:id", async(req,res)=>{
    const id = req.params.id
    try {
        const user = await User.findById(id)
        const deleteUser = await User.deleteOne({_id:id})
        res.status(200).json("user has been deleted", {deleteUser, user})
        if(!user) {throw new Error("user not found");}
        

    } catch (err) {
        res.status(500).json(err);
        
    }
  })

  router.get('/:id', async(req, res)=>{
    try {
    const user = await User.findById(req.params.id) 
    const{password, ...others} = user._doc
    res.status(200).json(others)      
    } catch (err) {
        res.status(500).json(err);
        
    }
  })



 

module.exports = router;
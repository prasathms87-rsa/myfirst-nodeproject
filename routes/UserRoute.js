const express = require('express');
const User = require('../models/User');
const uservalidation = require('../validations/uservalidation');
const validate = require("../validations/validates");
const Order = require('../models/Order');


const router = express.Router();


// Route Get All Users
router.get('/', async (req, res) => {

  try {
      const userdata = await User.findAll();

      //No data Found
     if (!userdata) {
          return res.status(404).json({ message: 'No data found' });
      }

      //return the data
      res.status(200).json(userdata);

      }
      catch (err) {
          res.status(500).json({ error: err.message });
      }

});

//Route Get User by ID
router.get('/:id', uservalidation.UserById,validate, async (req, res) => {  
  try{
  const userdata = await User.findAll({
    where : {id : req.params.id},
    include: {
      model: Order
    }
  });   

  //return not found
  if (!userdata) {
    return res.status(404).json({ message: 'User not found' });
  }
  //return the data
  res.status(200).json(userdata);
}
catch(err)
{
  res.status(500).json({error: err.errors.map(e => e.message)});
}
});



//Route Create User
router.post('/', uservalidation.createUserdata, validate, async (req, res) => {  

  try{
    
      const user = await User.create({
       firstname: req.body.firstname,
       lastname: req.body.lastname,
       gender: req.body.gender,
       age: req.body.age,
       location: req.body.location
     });

      res.status(201).json(user); 
  }
  catch(err)
  {
    res.status(500).json({error: err.errors ? err.errors.map(e => e.message) : err.message});
  }
});

//Route Update User by ID

router.put('/:id', uservalidation.PutUserdata,validate, async (req, res) => {
  try{
  
  const userdata = await User.findByPk(req.params.id);

  if (!userdata) {
    return res.status(404).json({ message: 'User not found' });
  }

  const updateddata = await userdata.update({
    firstname: req.body.firstname,
    lastname:req.body.lastname,
    gender:req.body.gender,
    age: req.body.age,
    location:req.body.location
  });

  res.json({
    message: `User data Updated for ${req.params.id}`,
    userdata: updateddata
  });
}
catch(err)
{
   res.status(500).json({error: err.errors.map(e => e.message)});
}
});

router.patch('/:id', uservalidation.PatchUserdata,validate, async (req, res) => {
  try{
  // check user exist
  //const UserIndex = Users.findIndex(u => u.id == req.params.id);
  const userdata = await User.findByPk(req.params.id);
  if (!userdata) {
    return res.status(404).json({ message: 'User not found' });
  }
 
  const UpdatedData = await userdata.update(req.body);

  res.json({
    message: `User data Updated for ${req.params.id}`,
    userdata: UpdatedData
  });
  }
  catch(err)
  {
    res.status(500).json({error: err.errors.map(e => e.message)});
  }

});


router.delete('/:id', uservalidation.UserById,validate, async (req, res) => {  
 try{
  const userdata =  await User.findByPk(req.params.id);
  if (!userdata) {
    return res.status(404).json({ message: 'User not found' });
  }

 // const deletedUser = Users.splice(UserIndex, 1);

  await userdata.destroy();


  res.json({
    message: `User data deleted for ${req.params.id}`
  });
}
catch(err)
{
res.status(500).json({error: err.errors.map(e => e.message)});
}
});

module.exports = router;
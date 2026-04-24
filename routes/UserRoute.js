const express = require('express');
const router = express.Router();

let Users = ([{id:1, firstname: 'Ram', lastname: 'Prasath', gender: 'Male', age: '37', location: 'Toronto'}, 
    {id:2, firstname: 'Rakshan', lastname: 'RamPrasath', gender: 'Male', age: '8', location: 'Tuticorin'}, 
    {id:3, firstname: 'Aadhya', lastname: 'RamPrasath', gender: 'Female', age: '2', location: 'Tuticorin'},
    {id:4, firstname: 'Sakthi', lastname: 'RamPrasath', gender: 'Female', age: '31', location: 'Tuticorin'}]);

    // Route Get All Users
router.get('/', (req,res) => {
  console.log(Users.length);
    //No data Found
    if(Users.length == 0)
     {
       return res.status(404).json({message: 'No data found'});
     }
     //return the data
    res.json(Users);
});

//Route Get User by ID
router.get('/:id', (req,res) => {

    if (!req.params.id) {
        return res.status(400).json({message: "ID parameter is required"
        });
    }
    //check User exist
    const UserIndex = Users.findIndex(u => u.id == req.params.id);
   
    //return not found
    if(UserIndex == -1)
     {
       return res.status(404).json({message: 'User not found'});
     }
     //return the data
    res.json(Users[UserIndex]);
});

//Route Create User
router.post('/', (req,res) => {     
    const { id, ...userData } = req.body;    

  const { firstname, lastname,gender, age, location } = req.body;

  // validate required fields
  if (!firstname|| !lastname || !gender|| !age || !location) {
    return res.status(400).json({
      message: "Required fields are Missing for creation"
    });
  }
     const newUser = {
  id: Users.length ? Users[Users.length - 1].id + 1 : 1,
  ...userData
};

//Save User data
Users.push(newUser);     

    res.json({
            message : 'User data Created',
            user:newUser
});

});

//Route Update User by ID

router.put('/:id', (req,res) => {     
    if (!req.params.id) {
        return res.status(400).json({message: "ID parameter is required"
        });
    }
      const { id, ...userData } = req.body;  
   
    // check user exist
     const UserIndex = Users.findIndex(u => u.id == req.params.id);
     if(UserIndex == -1)
     {
       return res.status(404).json({message: 'User not found'});
     }

  const { firstname, lastname,gender, age, location } = req.body;

  // validate required fields
  if (!firstname|| !lastname || !gender|| !age || !location) {
    return res.status(400).json({
      message: "Required fields are Missing for Update"
    });
  }

    //update user data
    Users[UserIndex] = { id:Users[UserIndex].id, 
        ...userData  };    
    
    res.json({
            message : `User data Updated for ${req.params.id}`,
            userdata:Users[UserIndex]
});
});

router.patch('/:id', (req,res) => {     
   const { id, ...userData } = req.body; 
    if (!req.params.id) {
        return res.status(400).json({message: "ID parameter is required"
        });
    }
    // check user exist
     const UserIndex = Users.findIndex(u => u.id == req.params.id);
     if(UserIndex == -1)
     {
       return res.status(404).json({message: 'User not found'});
     }
    //update user data
    Users[UserIndex] = { ...Users[UserIndex] , 
        ...userData,
    id: Users[UserIndex].id};    
    
    res.json({
            message : `User data Updated for ${req.params.id}`,
            userdata:Users[UserIndex]
});
});


router.delete('/:id', (req,res) => {  
    if (!req.params.id) {
        return res.status(400).json({message: "ID parameter is required"
        });
    }   
   
    // check user exist
     const UserIndex = Users.findIndex(u => u.id == req.params.id);
     if(UserIndex == -1)
     {
       return res.status(404).json({message: 'User not found'});
     }
    
    const deletedUser = Users.splice(UserIndex, 1); 
    
    
    res.json({
            message : `User data deleted for ${req.params.id}`            
});
});

module.exports = router;
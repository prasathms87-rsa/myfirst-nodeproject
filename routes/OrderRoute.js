const express = require('express');
const Order = require('../models/Order');
const ordervalidation = require('../validations/ordervalidation');
const validate = require("../validations/validates");

const router = express.Router();

// Route Get All Users
router.get('/', async (req, res) => {

  try {
      const orderdata = await Order.findAll();

      //No data Found
     if (orderdata.length == 0) {
          return res.status(404).json({ message: 'No data found' });
      }

      //return the data
      res.status(200).json(orderdata);

      }
      catch (err) {
          res.status(500).json({ error: err.message });
      }

});

// Route Get All Users
router.get('/:id', async (req, res) => {

  try {
    const { userid } = req.query;
      const orderdata = await Order.findAll({
        where : {userID : userid}
      });

      //No data Found
     if (orderdata.length == 0) {
          return res.status(404).json({ message: 'No data found' });
      }

      //return the data
      res.status(200).json(orderdata);

      }
      catch (err) {
          res.status(500).json({ error: err.message });
      }

});


//Route Create Order
router.post('/', ordervalidation.createOrderdata, validate, async (req, res) => {  

  try{
    
      const user = await Order.create({
       userID: req.body.userID,
       productname: req.body.productname,
       productSKU: req.body.productSKU
      
     });

      res.status(201).json(user); 
  }
  catch(err)
  {
    res.status(500).json({error: err.errors ? err.errors.map(e => e.message) : err.message});
  }
});

module.exports = router;

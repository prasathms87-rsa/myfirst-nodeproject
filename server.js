const express = require('express');
const sequelize = require('./config/db');
const User = require('./models/User');
const Order = require('./models/Order');

const UserRoute = require('./routes/UserRoute');
const OrderRoute = require('./routes/OrderRoute');

const app = express();

app.use(express.json());

User.hasMany(Order, { foreignKey: 'userID' });
Order.belongsTo(User, { foreignKey: 'userID' });

sequelize.sync()
  .then(() => console.log('✅ DB synced'))
  .catch(err => console.log('❌ Error:', err));


app.use('/Users', UserRoute);
app.use('/Orders', OrderRoute);

// Catch-all for routes that don't exist
app.use((req, res) => {
 res.status(404).json({ error: "Route not found or ID missing" });
});

// Global Error Handler (4 arguments required)
//app.use((err, req, res, next) => {
  //console.error(err.stack);
  //res.status(500).send('Something broke!');
//});

app.listen(3000, () => {
    console.log("server listening");
});

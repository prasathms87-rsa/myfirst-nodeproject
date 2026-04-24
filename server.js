const express = require('express');
const app = express();

app.use(express.json());

const UserRoute = require('./routes/UserRoute');

app.use('/Users', UserRoute);

app.listen(3000, () => {
    console.log("server listening");
});

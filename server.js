const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const config = require('./config.json')
const path = require('path');
//routes
const user = require("./app/routes/user.js")

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(err, res){
  res.sendFile(path.join(__dirname + '/app/public/home.html'));
})

app.use('/user', user);

const PORT = process.env.PORT || config.PORT

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});




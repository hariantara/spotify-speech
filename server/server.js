const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
var cors = require('cors')
app.use(cors())

mongoose.connect('mongodb://localhost/spotifydb', (err) => {
  if(!err) {
    console.log('database connected');
  } else {
    console.log('error connecting db');
  }
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.static('public'))

let index    = require('./routes/index.js')

// ===================== routing =================================//
app.use('/', index);
// =================== end of routing  ========================== //

//=========================================
app.listen(process.env.PORT || 3000, () => {
  console.log('app start on port 3000');
})

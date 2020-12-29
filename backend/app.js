const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/user');


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

const app = express();

mongoose.connect(`mongodb+srv://filind85:${keys.mongoDB}@cluster0.uyhhd.mongodb.net/messages?retryWrites=true&w=majority`).then(() => {
  console.log('connected to DB')
})
.catch( ()=> {
  console.log('connection failed')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Custom-Header', 'Authorization', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods',
  "GET, PUT, POST, DELETE, OPTIONS, PATCH");
  next();
});

app.use(messageRoutes);
app.use(userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

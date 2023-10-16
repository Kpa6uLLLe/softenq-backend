const express = require('express');
const { sequelize } = require('./models');
(async () => {
  // Creating database if it doesn't exist already
  await sequelize.sync({ force: false })
})();
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.get('/fr', (req, res) => {
    res.send('back and front are friends now');
  });
  
  
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(3000, () => console.log('Example app is listening on port 3000.'));

const express = require('express');
const { Sequelize, PrimaryKey, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:123@localhost:5432/postgres');
try {
  sequelize.authenticate()
  console.log('Successfully connected to the database')
} catch (e) {
  console.log('Unable to connect to the database: ', e)
}
// Creating user module

const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
);
(async () => {
  // Creating database if it doesn't exist already
  await sequelize.sync({ force: false })
  // Adding a new user in our database
 const john = await User.create({
  name: 'John',
  email: 'ex@ex.com',
  password: '123',
});
})();
const app = express();
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
  
  
app.listen(3000, () => console.log('Example app is listening on port 3000.'));

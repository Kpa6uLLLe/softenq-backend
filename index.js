const express = require('express');

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

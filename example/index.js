const express = require('express');
const path = require('path');
const swig = require('swig');
const expressAMP = require('../lib/index');
const PORT = 3000;
const app = express();

swig.setDefaults({ cache: false });

app.engine('swig', swig.renderFile);
app.set('views', path.join(__dirname, './client/templates'));
app.set('view cache', false);
app.set('view engine', 'swig');

app.use(express.static('client/public'));

app.use(expressAMP({
  override: true
}));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`AMP Test listen on port ${PORT}`);
});

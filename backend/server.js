const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const history = require('connect-history-api-fallback');


const https = require('https');
const options = new URL('https://spot-price.s3.amazonaws.com/spotblocks-generic.js');
const data = https.request(options, (res) => {


  res.on('data', (d) => {
    // process.stdout.write(d);
  });
});

data.on('error', (e) => {
  // console.error(e);
});
data.end();

const app = express()
var http = require('http').Server(app);

app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true // enable set cookie
}));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
  secret: 'vue app',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    expires: 600000
  }
}))


  
  app.use(history());
  app.use(express.static('public'));

  
  const PORT = process.env.PORT || 3003;
  http.listen(PORT, () => console.log(`pilus api listening on port ${PORT}`));



app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  // console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});


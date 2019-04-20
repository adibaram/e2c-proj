const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const history = require('connect-history-api-fallback');

const app = express()
const http = require('http').Server(app);

const fs = require('fs');

const https = require('https');
const prices = new URL('https://spot-price.s3.amazonaws.com/spotblocks-generic.js');

app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true // enable set cookie
}));

var tmp_json = {};
var data = {};
var gCounter = 0;

function getData() {
  var req1 = new Promise((resolve, reject) => {
    https.get(prices, (resp) => {
      let data = '';
  
  
      resp.on('data', (chunk) => {
        data += chunk;
        
      });
  
      resp.on('end', () => {
        // console.log('type of data', typeof data)
        let json = data
        json = json.slice(9).slice(0,-2)
        tmp_json = {};
        tmp_json = JSON.parse(json);
        resolve()
      });
  
    }).on("error", (err) => {
      console.log("Error: " + err.message);
      reject(error)
    });
  });
  
   
  
  Promise.all([ req1]).then(() => {
    data = JSON.stringify(tmp_json);
    fs.writeFile(`./data/data-v${gCounter}.json`, data, function(err, result) {
      gCounter ++;
  
      if(err) console.log('error', err);
    });
  })
}


var dataInterval = setInterval(function(){
  getData()
},60000)



app.get('/api/data', (req, res) => {

  fs.readFile( `./data/data-v${gCounter}.json`, 'utf8', function (err, data) {
      res.header("Access-Control-Allow-Origin", "http://localhost:8080");
      res.send(data);
      res.end( data );
  });

});


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

app.get('/api/data', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})


app.use(history());
app.use(express.static('public'));
app.use(express.json());

const PORT = process.env.PORT || 3003;
http.listen(PORT, () => {
  console.log(`pileus api listening on port ${PORT}`)
});

app.use(function(req, res, next) {
 
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



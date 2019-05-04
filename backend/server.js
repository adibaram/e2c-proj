const express = require('express');
const cors = require('cors');
const app = express()
const http = require('http').Server(app)

const fs = require('fs')

const https = require('https')
const prices = new URL('https://spot-price.s3.amazonaws.com/spotblocks-generic.js')

app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true // enable set cookie
}));


var dataInterval = setInterval(function(){
  getData()
},60000)

function counter() {
  var files = fs.readdirSync('./data');
  return files.length-1
}


function getData() {
  var tmp_json = {};
  var data = {};
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
    fs.writeFile(`./data/data-v${counter()+1}.json`, data, function(err, result) {
      if(err) console.log('error', err);
    });
  })
}


app.get('/api/data', (req, res) => {

  fs.readFile( `./data/data-v${counter()}.json`, 'utf8', function (err, data) {
      res.header("Access-Control-Allow-Origin", "http://localhost:8080");
      res.send(data);
      res.end( data );
  })
})


app.get('/api/data', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})


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



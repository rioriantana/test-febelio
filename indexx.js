const express = require('express');
const upload = multer({dest: __dirname + '/uploads/images'});
var fs = require('fs');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
var pretty = require('express-prettify');

const app = express();
const path = require('path');
const PORT = 3000;



app.use(express.static('public'), pretty({ query: 'pretty' }));

app.get('/', (req, res) => {
    //res.writeHead(200, {'Content-Type': 'text/html'});
    res.sendFile(path.join(__dirname+'/index.html'));
    //res.end();
});
app.get('/check', (req, ress)=>{
    url = "https://fabelio.com/ip/fabelio-cloud-latex-mattress.html";
    fetch(url).then(res=>res.text())
    .then(body=>{
        let $ = cheerio.load(body);
        var kode = $('#product-ratings').attr('data-product-id');
        fetch('https://fabelio.com/insider/data/product/id/'+kode)
        .then(res=> res.json())
        .then(json=> {
            ress.json(json)
        })
        .catch(err => ress.json(err));
    }).catch(err => ress.json(err));
})
app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/uploads/images')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })
  
//   var upload = multer({ storage: storage })
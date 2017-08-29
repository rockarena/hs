var express = require('express')
var request = require('request');
var app = express()
app.use(express.static('./client/'))

app.get('/get-data/', function(req, res) {
    request('https://hs-resume-data.herokuapp.com/', function(error, response, body) {
        console.log(error, response, body)
        if (!error && response.statusCode == 200) {
            res.json(body)
        }
    })

})

app.get('/',function(req,res){
    res.send('./client/index.html');
});


app.listen(3030)

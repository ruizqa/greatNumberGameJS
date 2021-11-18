// require express
let express = require("express");
let path = require("path");
let session = require('express-session');
let app = express();
let result;
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'codingDojo'}));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if(!req.session['number']){
        req.session['number'] = Math.floor(Math.random()*100+1)
    } 
    
    res.render("index", {'result':result});
})

app.get('/compare', function(req,res){
    result = {};
    let number = req.session['number'];
    let guess = req.query.guess;
    if(guess>number){
        result['high']=true;
        result.win=false;
        }
    else if(guess<number){
        result['high']=false;
        result.win=false;
    }
    else{
        result.win = true
        result.number= guess;
    }
    res.redirect('/');

})

app.get('/restart', function(req, res) {
    req.session.destroy();
    result=undefined;
    res.redirect('/');
})

app.listen(8085, function() {
 console.log("listening on port 8085");
});

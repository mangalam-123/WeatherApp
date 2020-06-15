const Server = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = Server();

app.use(bodyParser.urlencoded({extended :true}));

app.get("/",function(req, res){

res.sendFile(__dirname + "/index.html");

});
app.post("/", function(req, res){


    var query = req.body.cityName;
    var apiKey = "a08c71840e006f830a2aaebfc632c34a";
    var unit = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid="+ apiKey +"";

    https.get(url, function(response){
       response.on("data", function(data){
        const WEATHERdata = JSON.parse(data);

        const temp = WEATHERdata.main.temp;

        const description = WEATHERdata.weather[0].description;

        const icon = WEATHERdata.weather[0].icon;

        const imageUrl = "https://openweathermap.org/img/wn/"+ icon + "@2x.png"; 
        
        res.write("<p>The Weather forecast currently is " + description + "</p>");
        res.write("<h1>The Temperature in "+ query +" right now is " + temp + " degrees Celcius.</h1>");
        res.write("<img src=" + imageUrl +">");
        res.send();
       });
    });
});




app.listen(process.env.PORT || 3005, function(){
    console.log("Server is running on port no 3005");
});
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const emailAdress = req.body.email;

  const data ={

    members : [
      {
        email_address : emailAdress,
        status : "subscribed",
        merge_fields : {
          FNAME:firstName,
          LNAME:lastName
        }

      }
  ]


};

const jsonData = JSON.stringify(data);
const url = "https://usx.api.mailchimp.com/3.0/lists/{List-Id}";

const options = {
        method : "POST",
        auth :   "mahadev:USE YOUR OWN API KEY"
}

const request = https.request(url,options,function(response){

if(response.statusCode === 200)
{
  res.sendFile(__dirname + "/success.html");
}
else{
  res.sendFile(__dirname + "/failure.html");
}

  response.on("data",function(data){

  })
})

request.write(jsonData);
request.end();

});


app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
  console.log("Server started on port 3000");
});



// API KEY
// 9001798ff9ab092bc6513cba770d9da9-us6

// UNIQUE ID
// 73b3901fe0

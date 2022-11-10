const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var path = require('path');
//const ejsLint = require('ejs-lint');
const app = express();
let ejs = require('ejs');

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect("mongodb://localhost:27017/bankDB",{useNewUrlParser:true});

const customerSchema = {
  BankID:Number,
  CustomerName:String,
  CustomerEmail:String,
  AccountBalance:Number
};

const Customer = mongoose.model("customerCollection",customerSchema);

const cust1 = new Customer({
  BankID : 001,
  CustomerName : "Sunaina",
  CustomerEmail:"gpsunaina@gmail.com",
  AccountBalance:1000
});

const cust2 = new Customer({
  BankID : 002,
  CustomerName : "Mary Copper",
  CustomerEmail:"MaryCoop@gmail.com",
  AccountBalance:1000
});

const cust3 = new Customer({
  BankID : 003,
  CustomerName : "Sheldon",
  CustomerEmail:"Shedon@gmail.com",
  AccountBalance:1000
});

// cust1.save();
// cust2.save();
// cust3.save();




app.get("/customer",function(req,res){
// res.sendFile(__dirname+"/views/index.html");
Customer.find({},function(err,foundCustomers){
  //console.log(foundCustomers);
  res.render("customer",{content:foundCustomers})

});

app.get("/transfer",function(req,res){
  res.sendFile(__dirname+"/views/transfer.html");

});

app.get("/",function(req,res){
  res.sendFile(__dirname +"/views/index.html" )
});

app.post("/transfer.html",function(req,res){

  const customerID1 = req.body.customer1;
  const customerID2 = req.body.customer2;
  const amount = req.body.amount;

  Customer.findOne({"BankID":customerID1},function(err,foundItems){
  const newAmount1 = foundItems.AccountBalance - amount ;
  console.log(newAmount1);
  // const filter1 = {'BankID' : customerID1 };
  // const update1 = {'AmountBalance' : newAmount1};
  Customer.findOneAndUpdate({"BankID" : customerID1 },{$set:{"AccountBalance" : newAmount1}},function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {

    }
  });
  console.log(foundItems);

});

Customer.findOne({"BankID":customerID2},function(err,foundItems){
  var newAmount2 = parseInt(foundItems.AccountBalance) + parseInt(amount) ;
  console.log(newAmount2);
  Customer.findOneAndUpdate({"BankID" : customerID2 },{$set:{"AccountBalance" : newAmount2}},function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {

    }
  });
  console.log(foundItems);
  

});


});



  
})
















app.listen(3000,function(){
  console.log("server is listening in port 3000");
})

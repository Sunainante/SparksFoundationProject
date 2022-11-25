const admin = require('firebase-admin');
var path = require('path');
const port = process.env.PORT || 5000;

const { getFirestorre, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./ServiceAccount.json');
const bodyParser = require("body-parser");

let ejs = require('ejs');
// const ejsLint = require('ejs-lint');


const express = require("express");
const cors = require("cors");
const User = require("./config");
const { database } = require('firebase-admin');
const app = express();
const db = admin.firestore();

app.use(express.json());
app.set('view engine', 'ejs');

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.get("/",async(req,res)=> {
  res.sendFile(__dirname+"/views/index.html");
    // const snapshot = await User.get();
    // const list =  snapshot.docs.map((doc)=> doc.id);
    //const list = snapshot.docs.map((doc)=> ({id:doc.id,...doc.data()}))
    
});


app.get("/transfer",function(req,res){
    res.sendFile(__dirname+"/views/transfer.html");
    
  });

app.post("/transfer",async(req,res)=>{
  const customerID1 = req.body.customer1;
  const customerID2 = req.body.customer2;
  const amount = req.body.amount;
  console.log(customerID1);
  var custAcc1;
  var custAcc2;
  
  const snapshot = await db.collection('Users').get();
    const list = snapshot.forEach((doc) => {
      if(doc.id == customerID1)
      custAcc1=doc.data().AccountBalance;

      if(doc.id == customerID2)
      custAcc2 = doc.data().AccountBalance;
//(doc.id, '=>', doc.data().AccountBalance);
});

var newAmount1 = parseInt(custAcc1) - parseInt(amount);
var newAmount2 = parseInt(custAcc2) + parseInt(amount);
 customerID11 = customerID1 + 1;
  customerID22 = customerID2 + 1;


  await db.collection('Users').doc(customerID1).update({
    'AccountBalance': newAmount1
  });

  await db.collection('Users').doc(customerID2).update({
    'AccountBalance': newAmount2
  });

    // const data = req.body
    // //console.log(data);
    //  await User.set(data)
    // res.send({msg:"user added"})
});


app.get("/customer",async(req,res)=>{
  const snapshot = await db.collection('Users').get();
  var newData = [];
  const list = snapshot.forEach((doc) => {
    //console.log(doc.data());
    
    newData.push(doc.data());
    
   
  });
  res.render("customer",{content:newData})
  

})

app.post("/customer",async(req,res)=>{
 
  res.redirect("/customer");
})

app.listen(port,()=>console.log("app listening at 4000"));
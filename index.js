const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const hbs = require("hbs");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt=require('bcryptjs')
require("./src/db/conn");

const Register = require("./src/models/registers");


const static_path = path.join(__dirname, "/public");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(static_path));
app.set("view engine", "hbs");

const temp_path = path.join(__dirname, "/template/views");
app.set("views", temp_path);

const partials_path = path.join(__dirname, "/template/partials");
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/login',(req,res)=>{
    res.render('login')
})


app.get("/show", (req, res) => {
    Register.find({})
      .then((x) => {
        res.render("show", { x });
      })
      .catch((e) => {
        console.log(e);
      });
  });
  


app.post("/register", async (req, res) => {
    try {
      const password = req.body.password;
      const cpassword = req.body.confirmPassword;
  
      if (password === cpassword) {
        const registerHospital = new Register({
            hospitalName: req.body.hospitalName,
            address: req.body.address,
            city: req.body.city,
            state:req.body.state,
            pincode:req.body.pincode,
            regDate:req.body.regDate,
            ambulanceCount:req.body.ambulanceCount,
            email:req.body.email,
            phoneNumber:req.body.phoneNumber,
            regNumber:req.body.regNumber,
            emergencyWardNumber:req.body.emergencyWardNumber,
            password:req.body.password,
            confirmPassword:req.body.confirmPassword
        });
  
        const registered = await registerHospital.save();
        res.status(201).render('success');
      } else {
        res.send("PASSWORD ARE NOT MATCHING");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.post("/login", async (req, res) => {
    try {
      const hospitalName=req.body.hospitalName;
      const email = req.body.email;
      const password = req.body.password;
    const hos=await Register.findOne({hospitalName:hospitalName})
      const useremail = await Register.findOne({email:email });
      
  
      const isMatch = await bcrypt.compare(password, useremail.password);
  
      if (isMatch) {
        res.status(201).render("logged");
      } else {
        res.send("INVALID PASSWORD");
      }
    } catch (error) {
      res.status(400).send("INVALID LOGIN DETAILS");
    }
  });
  


app.listen(2000,()=>{
    console.log('SERVER ON')
})
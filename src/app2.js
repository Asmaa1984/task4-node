const fs = require("fs");
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const forecast = require("./forecast");
const geocode = require("./geocode")
const port = process.env.PORT || 5000;
const location = "united state"
/////////////////////////////////////
const dataPath = path.join(__dirname , "../data/data.json")
const data =JSON.parse(fs.readFileSync(dataPath , "utf-8"))
/////////////////////////////////////
console.log(data)
/////////////////////////////////////
const app = express();
const x = path.join(__dirname,"../public");
app.use(express.static(x))
app.set("view engine" , "hbs");
const partialPath = path.join(__dirname ,"../views/partials");
hbs.registerPartials(partialPath);
const year = new Date().getFullYear();
const image = path.join(__dirname , "../public/images/map.jpg")
app.get("/",(req,res)=>{
    res.render("index",{title:"Home",desc:"Welcome to My home page",year:year});
});
app.get("/service",(req,res)=>{
    res.render("service",{title:"Service",year:year , src:image});
});
 app.get('/service2', function (req, res) {
    country = req.query.country;
    console.log(country)
    geocode(country,(error,response)=>{
        if(error){
            console.log(error)
        }
        if(response){
            console.log(response)
            forecast(response.Longitude , response.latitude , response.country,(error,response)=>{
                if(error){
                    console.log(error)
                }
                if(response){
                    console.log(response);
                    const  d = JSON.parse(fs.readFileSync(dataPath,"utf-8"))
    
                    console.log(d)
                    res.render("service2" , {...d , year:year})

                }
            })
        }
    })
    
   })
   
app.listen(port ,()=>{
    console.log(`Example app listen on port ${port}`)
})

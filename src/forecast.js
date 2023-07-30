const request = require("request");
const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname , "../data/data.json")
const forecast = (latitude , Longitude , location, callback)=>{
    const url2 = `https://api.weatherapi.com/v1/current.json?key=7f97e74ef23b418c97a155211230503&q=${latitude},${Longitude}`;
    request({url:url2 , json:true},(error , response)=>{
        if(error){
            callback("you can't reach to this website" , undefined)
            fs.writeFileSync(dataPath , JSON.stringify({error}));
        }
        else if(response.body.error){
            
            const data = JSON.parse(fs.readFileSync(dataPath,"utf-8"))
            data.error = response.body.error.message;
            fs.writeFileSync(dataPath , JSON.stringify({error:response.body.error.message}));

            callback(response.body.error.message  , undefined)
        }
        
        else{
            const data = JSON.parse(fs.readFileSync(dataPath,"utf-8"));
            data.country = location
            data.city = response.body.location.name;
            data.Longitude =Longitude;
            data.latitude=latitude
            data.condition=response.body.current.condition.text;
            data.temp=response.body.current.temp_c ;
            data.error=""

            fs.writeFileSync(dataPath , JSON.stringify(data));

            callback(undefined ,`country is ${response.body.location.name}, condition is ${response.body.current.condition.text} and temp is ${response.body.current.temp_c}C`);
            //console.log(response.body.location.name , response.body.current.condition.text)
        }
});

};
module.exports = forecast
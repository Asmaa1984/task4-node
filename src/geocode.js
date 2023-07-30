const request = require("request");
const fs = require("fs");
const path = require("path");
const forecast = require("./forecast")
const dataPath = path.join(__dirname , "../data/data.json")
const geocode =(location , callback)=>{
    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYXNtYWExOTg0IiwiYSI6ImNsa2kzdGYzbDBmOHYzZHBscGwzNW10ZzcifQ.3VDDiv3LGB3gponrmU-s2Q`;
    request({url , json:true}, (error , response)=>{
        if(error){
            callback("you can't reach to this website" , undefined)
            fs.writeFileSync(dataPath , JSON.stringify({error:"you can't reach to this website"}));
        }
        else if(response.body.message){
            callback(response.body.message,undefined);
            
            fs.writeFileSync(dataPath , JSON.stringify({error:response.body.message}));
            
        }
        else if(response.body.features.length===0){
            callback("this country is not found" , undefined);
            fs.writeFileSync(dataPath , JSON.stringify({error:"this country is not found"}));

        }
        else{

            callback(undefined , {
                Longitude :Number( response.body.features[0].center[0].toFixed(2)),
                latitude : Number(response.body.features[0].center[1].toFixed(2)),
                country:location
            });
            //console.log(response.body.location.name , response.body.current.condition.text)
        }
    
    })
    
}

module.exports = geocode
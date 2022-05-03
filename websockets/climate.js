const m = require("../database.js");
import {data} from "../public/js/Konfig.js";
let database = m.insert;
let fetchData = m.fetch;

let konfig = data;

console.log(konfig);

let ws_site = [];
let ws_sensor = [];

function websocket(wss) {
    wss.on("connection", (ws) => {
        console.log("Client connected");
        
        ws.on("message", (data) => {
            
           CheckOrigin(ws, data);
           
           SortData(ws, data);
           
           
        });

        ws.on("close", () => {
            disconnect(ws);
        }
            );
    });
}

module.exports = websocket;

//Check websocket origin
function CheckOrigin(ws, data){
        //Sensor communicates the message "sensor", and the server adds that websocket into an array of ws sensors.
        if(data == "sensor"){
        ws_sensor.push(ws);
        console.log("Sensor: Pushed");
    }

    //Same for the website ws
    if(data == "site"){
        ws_site.push(ws);
        console.log("Site: Pushed");
    }
}

function disconnect(ws){

    console.log("Client disconnected");
    //if ws is from a sensor(esp32-board), then splice it from the ws_sensor array.
    let i = ws_sensor.indexOf(ws);
    if(i != -1){
        ws_sensor.splice(i, 1);
        console.log("Sensor: Spliced");
    }
    
    //if ws is from a website, then splice it from the ws_site array.
    let j = ws_site.indexOf(ws);
    if(j != -1){
        ws_site.splice(j, 1);
        console.log("Site: Spliced");
    }
}

async function SortData(ws, data){

    let i = ws_sensor.indexOf(ws);
    if(i != -1 && data != "sensor"){
        let values = data.split(",");
        let temp = values[0];
        let hum = values[1];
        console.log("Data!");
        //database function sends query to database with the data. 
        await database(temp, hum);
    }
}


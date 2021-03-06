const m = require("../database.js");

let insert = m.insert;
let fetchData = m.fetch;
let update = m.update

let ws_site = [];
let ws_sensor = [];

 function websocket(wss) {
    wss.on("connection", (ws) => {
        console.log("Client connected");
        
        ws.on("message", (data) => {
            
           CheckOrigin(ws, data);
           
           HandleRequest(ws, data);
           
           
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
        ws.send("hello!");
        console.log("Sensor: Pushed");
        console.log(ws_sensor);
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

async function HandleRequest(ws, data){

    let i = ws_sensor.indexOf(ws);
    let j = ws_site.indexOf(ws);
    if(i != -1 && typeof data != "string"){
        let values = data.split(",");
        let temp = values[0];
        let hum = values[1];
        console.log("Inserting Data Into climate");
        //database function sends query to database with the data. 
        await insert(temp, hum, "climate");
    }

    //Fetch data from climate tabel
    if(j != -1 && data == "climate" || data == "History"){
        console.log("fetching data...");
        await fetchData(data);
        console.log("data fetched!");
        setTimeout(()=>{
            let result = m.results;
            ws.send(result);
        }, 50);
    }

    if(j != -1 && data != "site" && data != "fetch"){
        update(data, 'sensor-1');
    }

    //Send data to sensors
    if(i !== -1 && data == "config"){
       console.log("Sending config to sensor");
       
    }

}


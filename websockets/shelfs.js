const m = require("../database.js");

let insert = m.insertShelf;
let fetch = m.fetch;


function websocket_2(wss2) {
    wss2.on("connection", (ws) => {
        
        ws.on("message", (data) => {
            SortData(ws, data);
            
        });

    });
}

module.exports = websocket_2;

async function SortData(ws, data){
    let values = data.split(",");
    let shelf = values[0];
    let cheese = values[1];
    console.log(cheese);
    insert(shelf, cheese);
}
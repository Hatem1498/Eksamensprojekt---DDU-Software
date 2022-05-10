
console.log("Connecting...");
let HOST = location.origin.replace(/^http/, "ws");
let ws = new ReconnectingWebSocket(HOST);

ws.onopen = (ev) => {
    ws.send("site");

    if(document.URL.includes("Graphs.html")){
        ws.send("fetch");
    }
    
}

if(document.URL.includes("Graphs.html")){
    setInterval(()=>{
        ws.send("fetch");
    }, 10000);
}

ws.onmessage = (event) => {

    //If data from the event is a Json, then the temp and hum are updated for the chart, since the Json would contain data stored in the database from the sensors.
    if(isJson(event.data)){
        console.log("Data Recieved");
        let time = [];
        let temp = [];
        let hum = [];
        let json = event.data;
        console.log(json);
        let refpoint = (new Date((json.filter(obj=>{return obj.id == 1}))[0].date_time)).getTime();
        for(obj in json){
            temp.push(json[obj].temp);
            hum.push(json[obj].hum);
            let date = parseFloat((((new Date(json[obj].date_time)).getTime())-refpoint)/60000).toFixed(1);
            time.push(date);
        }
        updateChart(temp, hum, time);
    }
    
};


ws.onclose = ()=>{
    console.log("Connection closed...Restarting");
    ws.reconnect();
    
    //Previous solution, also the function solution
    /* setTimeout(()=>{
        location.reload();
    }, 1000); */
};








function isJson(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}
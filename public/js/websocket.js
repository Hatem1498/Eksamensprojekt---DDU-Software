function websocket(){
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
            let time = [];
            let temp = [];
            let hum = [];
            let json = JSON.parse(event.data);
            let refpoint = (new Date((json.filter(obj=>{return obj.id == 1}))[0].date_time)).getTime();
            for(obj in json){
                temp.push(json[obj].temp);
                hum.push(json[obj].hum);
                let date_time = parseInt((((new Date(json[obj].date_time)).getTime())-refpoint)/1000);
                time.push(date_time);
            }
            updateChart(temp, hum, time);
           
        }
        
    };
    setTimeout(()=>{
        ws.close();
    }, 12000);

    ws.onclose = ()=>{
        console.log("Connection closed...Restarting");
    };

}

websocket();




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
const HOST = location.origin.replace(/^http/, "ws");
const ws = new WebSocket(HOST);



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

    //If data from the event is a Json, then the temp and hum are updated for the chart
    if(isJson(event.data)){
        let time = [];
        let temp = [];
        let hum = [];
        console.log(JSON.parse(event.data));
        let json = JSON.parse(event.data);
        let refpoint = (new Date((json.filter(obj=>{return obj.id == 1}))[0].date_time)).getTime();
        console.log(refpoint);
        for(obj in json){
            temp.push(json[obj].temp);
            hum.push(json[obj].hum);
            let date_time = parseInt((((new Date(json[obj].date_time)).getTime())-refpoint)/1000);
            time.push(date_time);
        }
        console.log(time);
        updateChart(temp, hum, [0, 1, 2, 3, 4, 5]);
    }
    

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
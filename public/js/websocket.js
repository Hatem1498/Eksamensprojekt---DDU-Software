const HOST = location.origin.replace(/^http/, "ws");
const ws = new WebSocket(HOST);



ws.onopen = (ev) => {
    ws.send("site");
    if(document.URL.includes("Graphs.html")){
        ws.send("fetch");
    }
}

ws.onmessage = (event) => {

    if(isJson(event.data)){
        console.log(JSON.parse(event.data));
        let json = JSON.parse(event.data);
        for(obj in json){
            temp.push(json[obj].temp);
            hum.push(json[obj].hum);
        }
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
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
        let json = event.data;
        console.log(json[0].temp);
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
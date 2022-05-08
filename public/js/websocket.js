const HOST = location.origin.replace(/^http/, "ws");
const ws = new WebSocket(HOST);



ws.onopen = (ev) => {
    ws.send("site");
    if(document.URL.includes("Graphs.html")){
        ws.send("fetch");
    }
}

ws.onmessage = (event) => {
    console.log(event);
    if(isJson(event)){
        console.log("JSON!");
        console.log(event);
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
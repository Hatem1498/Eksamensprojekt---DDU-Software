const HOST = location.origin.replace(/^http/, "ws");
const ws = new WebSocket(HOST);



ws.onopen = (ev) => {
    ws.send("site");
    if(document.URL.includes("Graphs.html")){
        ws.send("fetch");
    }
}

ws.onmessage = (event) => {
    

};

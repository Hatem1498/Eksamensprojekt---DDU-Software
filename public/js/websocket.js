console.log("Connecting...");
let HOST = location.origin.replace(/^http/, "ws");
let ws = new ReconnectingWebSocket(HOST);
let select = document.getElementById("select_data");
let history = false;

ws.onopen = (ev) => {
    ws.send("site");

    if(document.URL.includes("Graphs.html")){
        if(!history){
        ws.send("climate");
        }
    }
}

if(document.URL.includes("Graphs.html")){
    
        setInterval(()=>{
            if(!history){
            ws.send("climate");
            }
        }, 60000);
    
    select.addEventListener("click", function(){
        
        let options = select.querySelectorAll("option");
        if(typeof(options.length) == "undefined" || options.length < 2){
            history = true;
            ws.send("History");
        }
    });
    select.addEventListener("change", function(){
        ws.send("History");
    });
}

ws.onmessage = (event) => {
    console.log(event.data);
    //If data from the event is a Json, then the temp and hum are updated for the chart, since the Json would contain data stored in the database from the sensors.
    if(!history){
        if(isJson(event.data)){
            try{
                console.log("Data Recieved");
                let time = [];
                let temp = [];
                let hum = [];
                let json = JSON.parse(event.data);
                let refpoint = (new Date((json.filter(obj=>{return obj.id == 1}))[0].date_time)).getTime();
                for(obj in json){
                    temp.push(json[obj].temp);
                    hum.push(json[obj].hum);
                    let date = parseFloat((((new Date(json[obj].date_time)).getTime())-refpoint)/60000).toFixed(1);
                    time.push(date);
                }
                updateChart(temp, hum, time);
            }
            catch(error){
                console.log("Data is empty");
                console.log(`Error: ${error}`);
            }
        }
    }
    else{
        let data = JSON.parse(event.data);
        if(data[0].data != undefined){
            HistoryOptions(data);
        }
        if(select.value != null || select.value != ""){
            getHistory(event.data, select.value);
        }
    }
};


ws.onclose = ()=>{
    console.log("Connection closed...Restarting");
    ws.reconnect();
    
};



function HistoryOptions(data){
    let options = document.querySelectorAll("option");
    options.forEach(option =>{
        option.remove();
    })
    for(row of data){
        let size = Object.keys(row.data).length;
        let start = new Date((row.data.filter(obj=>{return obj.id == 1}))[0].date_time);
        let end = new Date((row.data.filter(obj=>{return obj.id == row.data[size-1].id}))[0].date_time);
        let clock = `${start.getHours()}:${start.getMinutes()}-${end.getHours()}:${end.getMinutes()}`
        let date = `${start.getDate()}/${start.getMonth()+1}/${start.getFullYear()}`;
        let opt = document.createElement("option");
        opt.innerHTML = `${clock} , ${date}`;
        opt.value = (row.id)-1;
        select.appendChild(opt);
    }

}

function getHistory(data_, row){
    let tempData = [];
    let humData = [];
    let time = [];
    
    let data = JSON.parse(data_);
    //Start date, as time in ms
    let refpoint = (new Date(((data[row].data).filter(obj=>{return obj.id == 1}))[0].date_time)).getTime();
    
    // Each "r", is a row from the data saved from climate table.
    for(r of data[row].data){
        tempData.push(r.temp);
        humData.push(r.hum);
        //Time in relation to our refpoint, (/1000) convert to s from ms
        let date_time = parseFloat((((new Date(r.date_time)).getTime())-refpoint)/60000).toFixed(1);
        time.push(date_time);
    }
    updateChart(tempData, humData, time);
    
}





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

function Live(){
    history = false;
    ws.send("climate");
}
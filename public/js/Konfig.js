const form = document.getElementsByClassName("Konfig")[0];

form.addEventListener("submit", configure);

function configure(event){
    let v_ssid = document.querySelector("#ssid").value;
    let v_password = document.querySelector("#password").value;
    let v_sensor_1 = document.querySelector("#t_sensor_1").value;
    let data = {ssid: v_ssid, password: v_password, t_sensor_1: v_sensor_1};
    
    data = SortObject(data);
    console.log(data);
    /* ws.send(Object.values(data)); */
}

function SortObject(obj){
   let n_obj = {};
    for(key in obj){
        if(obj[String(key)] !== null && obj[String(key)] != ""){
            n_obj[String(key)] = obj[String(key)];
        }
    }
    return n_obj;
}
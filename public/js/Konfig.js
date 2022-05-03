const form = document.getElementsByClassName("Konfig")[0];

form.addEventListener("submit", configure);

let data;

function configure(event){
    let v_ssid = document.querySelector("#ssid").value;
    let v_password = document.querySelector("#password").value;
    let v_sensor_1 = document.querySelector("#t_sensor_1").value;
    let data = {ssid: v_ssid, password: v_password, t_sensor_1: v_sensor_1};
    
    console.log(data);

    SortObject(data);

    console.log(data);

    
    
}

function SortObject(obj){
    for(key in obj){
        if(obj.key == null || obj.key == ""){
            console.log(obj.key);
            delete obj.key;
        }
    }
}
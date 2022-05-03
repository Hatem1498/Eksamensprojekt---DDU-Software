const form = document.getElementsByClassName("Konfig")[0];

form.addEventListener("submit", configure);


function configure(event){
    
    const data = new FormData(event.target);
    const dataJson = Object.fromEntries(data.entries());

    console.log(dataJson);
    console.log(Key_isEmpty(dataJson.ssid));
    console.log(Key_isEmpty(dataJson.password));
    console.log(Key_isEmpty(dataJson.t_sensor_1));
    

}


function Key_isEmpty(key){

    if(key !== null && key !== ""){
        return false
    }
    return true;
}
const form = document.getElementsByClassName("Konfig")[0];

form.addEventListener("submit", configure);



function configure(event){
    
    let data = new FormData(event.target);
    let dataJson = Object.fromEntries(data.entries());

    console.log(Reflect.getOwnPropertyDescriptor(window, "dataJson"));
    SortObject(dataJson);
    console.log(dataJson);
    
}

//Remove empty keys
function SortObject(obj){

    for(key in obj){
        if(obj.key == null || obj.key == ""){
            console.log(key);
            console.log(delete obj.key);
            console.log("delete");
        }
    }
}

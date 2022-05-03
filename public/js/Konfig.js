const form = document.getElementsByClassName("Konfig")[0];

form.addEventListener("submit", configure);

let dataJson;

function configure(event){
    
    const data = new FormData(event.target);
    const dataJson = Object.fromEntries(data.entries());

    console.log(dataJson);
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

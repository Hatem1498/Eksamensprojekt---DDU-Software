const form = document.getElementsByClassName("Konfig")[0];

form.addEventListener("submit", configure);

let dataJson;

function configure(event){
    
    const data = new FormData(event.target);
    dataJson = Object.fromEntries(data.entries());


    SortObject(dataJson);
    console.log(dataJson);
    
}

//Remove empty keys
function SortObject(obj){

    for(key in obj){
        if(obj.key == null || obj.key == ""){
            delete obj.key;
        }
    }
}

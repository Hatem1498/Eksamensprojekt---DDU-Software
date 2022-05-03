const form = document.getElementsByClassName("Konfig")[0];

form.addEventListener("submit", configure);

let dataJson;

function configure(event){
    
    const data = new FormData(event.target);
    const dataJson = Object.fromEntries(data.entries());

    console.log(dataJson);

    console.log(SortObject(dataJson));
    
}

//Remove empty keys
function SortObject(obj){

    for(key in obj){
        if(obj[key] == null || obj[key] == ""){
            delete obj[key];
        }
    }
}

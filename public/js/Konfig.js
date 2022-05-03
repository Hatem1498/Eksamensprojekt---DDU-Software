const form = document.getElementsByClassName("Konfig")[0];

form.addEventListener("submit", configure);



function configure(event){
    
    let data = new FormData(event.target);
    

    console.log(data);
    SortObject(data);
    let dataJson = Object.fromEntries(data.entries());
    console.log(dataJson);
    
}

//Remove empty keys
function SortObject(obj){

    for(key in obj){
        if(obj.key == null || obj.key == ""){
            console.log(key);
            obj.delete(String(key));
            console.log("delete");
        }
    }
}

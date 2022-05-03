const form = document.getElementsByClassName("Konfig")[0];

form.addEventListener("submit", configure);

let dataJson;

function configure(event){
    
    let data = new FormData(event.target);
    
    console.log(data);
   
    SortObject(data);
    dataJson = Object.fromEntries(data.entries());
    console.log(dataJson);
    
}

//Remove empty properties
function SortObject(form){

    for(let pair of form.entries()){
        console.log(pair)
        if(pair[1].length == 0){
            form.delete(pair[0]);
        }
    }
}

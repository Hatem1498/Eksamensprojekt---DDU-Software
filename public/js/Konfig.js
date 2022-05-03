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
function SortObject(form){

    for(let pair of form.entries()){
        console.log(pair);
    }
}

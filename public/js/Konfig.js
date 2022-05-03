const form = document.getElementsByClassName("Konfig")[0];

form.addEventListener("submit", configure);



function configure(event){
    
    let data = new FormData(event.target);
    

    for(pair of data.entries()){
        console.log(pair);
    }
    SortObject(data);
    let dataJson = Object.fromEntries(data.entries());
    console.log(dataJson);
    
}

//Remove empty keys
function SortObject(form){

    for(let pair of form.entries()){
        if(pair[1] == null || pair[1] == ''){
            console.log(form.delete(pair[0]));
        }
    }
}

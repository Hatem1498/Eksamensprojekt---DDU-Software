const form = document.getElementsByClassName("Konfig")[0];

form.addEventListener("submit", configure);

let dataJson;

function configure(event){
    
    let data = new FormData(event.target);
    
    for(let pair of data.entries()){
        console.log(pair);
        if(pair[1].length == 0){
            data.delete(pair[0]);
        }
    }
   
    dataJson = Object.fromEntries(data.entries());
    console.log(dataJson);
    
}


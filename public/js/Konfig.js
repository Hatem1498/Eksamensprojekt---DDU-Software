const form = document.getElementsByClassName("Konfig")[0];

form.addEventListener("submit", configure);

let dataJson;

async function configure(event){
    
    let data = new FormData(event.target);
    

    for(pair of data.entries()){
        console.log(pair);
    }
    await SortObject(data);
    dataJson = Object.fromEntries(data.entries());
    console.log(dataJson);
    
}

//Remove empty properties
async function SortObject(form){

    for(let pair of form.entries()){
        if(pair[1] == null && pair[1] == ''){
            form.delete(pair[0]);
        }
    }
}

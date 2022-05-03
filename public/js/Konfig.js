const form = document.getElementsByClassName("Konfig")[0];

form.addEventListener("submit", configure);

let dataJson;

async function configure(event){
    
    let data = new FormData(event.target);
    

   
    await SortObject(data);
    dataJson = Object.fromEntries(data.entries());
    console.log(dataJson);
    
}

//Remove empty properties
async function SortObject(form){

    for(let pair of form.entries()){
        console.log(pair)
        if(pair[1].length == 0){
            form.delete(pair[0]);
        }
    }
}

const form = document.getElementsByClassName("Konfig")[0];

form.addEventListener("submit", configure);


function configure(event){
    
    const data = new FormData(event.target);
    const dataJson = Object.fromEntries(data.entries());

    console.log(dataJson);

    console.log(JSON.stringify(dataJson));

}

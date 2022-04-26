const form = document.getElementsByClassName("CreateQR")[0];

if(document.URL.includes("Create-QR-cheese.html")){
    form.addEventListener("submit", cheeseQR);
}

if(document.URL.includes("Create-QR-shelf.html")){
    form.addEventListener("submit", shelfQR);
}

function cheeseQR(event){

    const data = new FormData(event.target);
    const dataJson = Object.fromEntries(data.entries());
    const stringJson = JSON.stringify(dataJson);
    window.open(`http://api.qrserver.com/v1/create-qr-code/?data=${stringJson}&size=${dataJson.image_size}`, "_blank");
}

function shelfQR(event){

    const data = new FormData(event.target);
    const dataJson = Object.fromEntries(data.entries());
    window.open(`http://api.qrserver.com/v1/create-qr-code/?data=${dataJson.name}&size=${dataJson.image_size}`, "_blank");    
}
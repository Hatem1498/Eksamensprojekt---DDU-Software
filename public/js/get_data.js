const el = document.querySelector("body");


fetch("/data/get")
    .then((response) => response.json())
    .then((data) => {
        for (row of data.results) {
            let temp = row.temp;
            let hum = row.hum;

            el.innerHTML += "<br> " + temp + " C           " + hum + " %" ;
            
        }
    });

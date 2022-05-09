let count = 16;
const w = $(window).width();
for(let i = 0; i < count; i++){
    //create canvas
    let canvas = document.createElement('canvas');
    //canvas id is shelf with indication of shelf number from 0 to 15
    canvas.id = `shelf-${i}`;
    //given class name shelf, so all shelfs can be selected easily in css
    canvas.className = "shelf";
    canvas.style.position = "absolute";
    //If the shelf as it the beginning of a row
    if(i == 0 || i == 4 || i == 8 || i == 12){
        canvas.style.left = "20px";
    } 
    //else the shelf y-position is the previous shelf's width+y+20
    else{
        let p_left = parseFloat(document.getElementById(`shelf-${i-1}`).style.left.replace("px", ""));
        let p_width = parseFloat(document.getElementById(`shelf-${i-1}`).style.width.replace("px", ""));
        canvas.style.left = `${(p_left+20)+p_width}px`;
    }
    //canvas width is the window width/4, 
    canvas.style.width = `${(w/4-20)}px`;
    canvas.style.height = `${(w/4)-(20*5-50)}px`;
    canvas.style.top = "75px";
    //second row top is the sum of previous row height and top and aditional 125 to create space between them
    if(i > 3 && i < 8){
        console.log(i);
        let p_height = parseFloat(document.getElementById(`shelf-${0}`).style.height.replace("px", ""));
        let p_top = parseFloat(document.getElementById(`shelf-${0}`).style.top.replace("px", ""));
        canvas.style.top = `${p_height+p_top+125}px`;
    }
    //third row, same idea as before
    else if(i > 7 && i < 12){
        console.log(i);
        let p_height_1 = parseFloat(document.getElementById(`shelf-${4}`).style.height.replace("px", ""));
        let p_top_1 = parseFloat(document.getElementById(`shelf-${4}`).style.top.replace("px", ""));
        canvas.style.top = `${p_height_1+p_top_1+125}px`;
    }
    //fourth row
    else if(i > 11 && i < 16){
        console.log(i);
        let p_height_2 = parseFloat(document.getElementById(`shelf-${8}`).style.height.replace("px", ""));
        let p_top_2 = parseFloat(document.getElementById(`shelf-${8}`).style.top.replace("px", ""));
        canvas.style.top = `${p_height_2+p_top_2+125}px`;
    }
    //Finally append the canvas element into the body element of html
    document.body.appendChild(canvas);
    
}

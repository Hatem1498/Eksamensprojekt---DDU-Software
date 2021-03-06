//Previous solution
/* let count = 16;
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
    //window width(w)/4, because there is 4 shelfs in each row. -40 to account for the +20 left that all first shelfs in a row get. 
    canvas.style.width = `${(w/4-40)}px`;
    canvas.style.height = `${(w/4-40)/2-50}px`;
    canvas.style.top = "75px";
    //second row top is the sum of previous row height and top and aditional 100 to create space between them
    if(i > 3 && i < 8){
        console.log(i);
        let p_height = parseFloat(document.getElementById(`shelf-${0}`).style.height.replace("px", ""));
        let p_top = parseFloat(document.getElementById(`shelf-${0}`).style.top.replace("px", ""));
        canvas.style.top = `${p_height+p_top+100}px`;
    }
    //third row, same idea as before
    else if(i > 7 && i < 12){
        console.log(i);
        let p_height_1 = parseFloat(document.getElementById(`shelf-${4}`).style.height.replace("px", ""));
        let p_top_1 = parseFloat(document.getElementById(`shelf-${4}`).style.top.replace("px", ""));
        canvas.style.top = `${p_height_1+p_top_1+100}px`;
    }
    //fourth row
    else if(i > 11 && i < 16){
        console.log(i);
        let p_height_2 = parseFloat(document.getElementById(`shelf-${8}`).style.height.replace("px", ""));
        let p_top_2 = parseFloat(document.getElementById(`shelf-${8}`).style.top.replace("px", ""));
        canvas.style.top = `${p_height_2+p_top_2+100}px`;
    }
    //Finally append the canvas element into the body element of html
    document.body.appendChild(canvas);
} */

const w = $(window).width();
for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
        let canvas = document.createElement('canvas');
        //The canvas element id is the position in current row (j) + (i*4) to account for previous rows. 
        canvas.id = `shelf-${j+(i*4)}`;
        //All canvases get same className to make it easier to select them all in js and css
        canvas.className = "shelf";
        canvas.style.position = "absolute";
        //If the shelf is at the start of a row, set left to 20px
        if(j == 0){
            canvas.style.left = "20px";
        }
        //else the shelf left value is equal to the sum of the previous shelfs width and left, and an additional 20px to create space between them
        else{
            let p_left = parseFloat(document.getElementById(`shelf-${j+(i*4)-1}`).style.left.replace("px", ""));
            let p_width = parseFloat(document.getElementById(`shelf-${j+(i*4)-1}`).style.width.replace("px", ""));
            canvas.style.left = `${(p_left+20)+p_width}px`;
        }
        canvas.style.width = `${(w/4-40)}px`;
        canvas.style.height = `${(w/4-40)/2-75}px`;
        canvas.style.top = "75px";
        //i > 0 i.e the we are below the first row, then the top is equal to the previous rows top and height plus 100 to create space. 
        if(i > 0){
            let p_height = parseFloat(document.getElementById(`shelf-${j+((i-1)*4)}`).style.height.replace("px", ""));
            let p_top = parseFloat(document.getElementById(`shelf-${j+((i-1)*4)}`).style.top.replace("px", ""));
            canvas.style.top = `${p_height+p_top+100}px`;
        }
        //Finally append canvas into html body
        document.body.appendChild(canvas);
    }
}

const shelfs = document.querySelectorAll(".shelf");

shelfs.forEach(shelf => {
    console.log(shelf.id);
});

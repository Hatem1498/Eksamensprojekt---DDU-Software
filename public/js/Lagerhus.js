let count = 16;
const w = $(window).width();
for(let i = 0; i < count; i++){
    let canvas = document.createElement('canvas');
    canvas.id = `box-${i}`;
    canvas.className = "shelf";
    canvas.style.position = "absolute";
    if(i == 0 || i == 4 || i == 8 || i == 12){
        canvas.style.left = "20px";
    } 
    else{
        let p_left = parseFloat(document.getElementById(`box-${i-1}`).style.left.replace("px", ""));
        let p_width = parseFloat(document.getElementById(`box-${i-1}`).style.width.replace("px", ""));
        canvas.style.left = `${(p_left+20)+p_width}px`;
    }
    canvas.style.width = `${w/4-20*5-100}px`;
    canvas.style.height = `${Math.ceil(w/4-20*6-50)}px`;
    canvas.style.top = "75px";
    //Row 2
    if(i > 3 && i < 8){
        console.log(i);
        let p_height = parseFloat(document.getElementById(`box-${0}`).style.height.replace("px", ""));
        let p_top = parseFloat(document.getElementById(`box-${0}`).style.top.replace("px", ""));
        canvas.style.top = `${p_height+p_top+25}px`;
    }
    //Row 3
    else if(i > 7 && i < 12){
        console.log(i);
        let p_height_1 = parseFloat(document.getElementById(`box-${4}`).style.height.replace("px", ""));
        let p_top_1 = parseFloat(document.getElementById(`box-${4}`).style.top.replace("px", ""));
        canvas.style.top = `${p_height_1+p_top_1+25}px`;
    }
    //Row 4
    else if(i > 11 && i < 16){
        console.log(i);
        let p_height_2 = parseFloat(document.getElementById(`box-${8}`).style.height.replace("px", ""));
        let p_top_2 = parseFloat(document.getElementById(`box-${8}`).style.top.replace("px", ""));
        canvas.style.top = `${p_height_2+p_top_2+25}px`;
    }
    document.body.appendChild(canvas);
    
}

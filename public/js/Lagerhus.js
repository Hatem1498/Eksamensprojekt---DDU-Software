let count = 16;
const position = { x: 0, y: 0 }
let x = 0; let y = 0
for(let i = 0; i < count; i++){
    let canvas = document.createElement('canvas');
    canvas.id = `box-${i}`;
    canvas.className = "shelf";
    canvas.style.position = "absolute";
    if(i == 0 || i == 4 || i == 8 || i == 12){
        canvas.style.left = "20px";
    } 
    else{
        let p_left = parseInt(document.getElementById(`box-${i-1}`).style.left.replace("px", ""));
        let p_width = parseInt(document.getElementById(`box-${i-1}`).style.width.replace("px", ""));
        canvas.style.left = `${(p_left+20)+p_width}px`;
    }
    let w = $(window).width();
    canvas.style.width = `${w/4-20*6}px`;
    canvas.style.height = `${Math.ceil(w/4-20*6-50)}px`;
    canvas.style.top = "75px";
    //Row 2
    if(i > 3 && i < 8){
        console.log(i);
        let p_height = parseInt(document.getElementById(`box-${0}`).style.height.replace("px", ""));
        let p_top = parseInt(document.getElementById(`box-${0}`).style.height.replace("px", ""));
        canvas.style.top = `${p_height+p_top+25}px`;
    }
    //Row 3
    if(i > 7 && i < 12){
        console.log(i);
        setTimeout(()=>{
        let p_height_1 = parseInt(document.getElementById(`box-${4}`).style.height.replace("px", ""));
        let p_top_1 = parseInt(document.getElementById(`box-${4}`).style.height.replace("px", ""));
        console.log(p_height_1+p_top_1);
        canvas.style.top = `${p_height_1+p_top_1+25}px`;
        }, 2000);
        
    }
    //Row 4
    if(i > 11 && i < 16){
        console.log(i);
        let p_height_2 = parseInt(document.getElementById(`box-${8}`).style.height.replace("px", ""));
        let p_top_2 = parseInt(document.getElementById(`box-${8}`).style.height.replace("px", ""));
        console.log(p_height_2+p_top_2);
        canvas.style.top = `${p_height_2+p_top_2+25}px`;
    }
    document.body.appendChild(canvas);
    /* interact(canvas).draggable({listeners:{start(event){console.log(event.type,event.target)},move(event){position.x+=event.dx;position.y+=event.dy;event.target.style.transform=`translate(${position.x}px,${position.y}px)`},}}) */
}

let element = document.getElementById('box-1');









element.addEventListener('click', ()=>{console.log(`top: ${element.style.top}, left: ${element.style.left} `)})
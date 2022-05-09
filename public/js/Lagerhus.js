let count = 16;
const position = { x: 0, y: 0 }
let x = 0; let y = 0
for(let i = 0; i < count; i++){
    let canvas = document.createElement('canvas');
    canvas.id = `box-${i}`;
    canvas.style.position = "absolute";
    if(i == 0 || i == 4 || i == 8 || i == 12){
        canvas.style.left = "20px";
    } 
    else{
        let pre = parseInt(document.getElementById(`box-${i-1}`).style.left.replace("px", ""));
        canvas.style.left = `${pre+20}px`;
    }
    canvas.className = "shelf";
    let w = $(window).width();
    canvas.style.width = `${w/4-20*6}px`;
    canvas.style.height = `${Math.ceil(w/4-20*6-50)}px`;
    canvas.style.top = "75px";

    if(i > 3){
        canvas.style.top = "100px";
    }
    if(i > 7){
        canvas.style.top = "125px";
    }
    if(i > 11){
        canvas.style.top = "150px";
    }
    canvas.style.position = "relative";
   
    document.body.appendChild(canvas);
    /* interact(canvas).draggable({listeners:{start(event){console.log(event.type,event.target)},move(event){position.x+=event.dx;position.y+=event.dy;event.target.style.transform=`translate(${position.x}px,${position.y}px)`},}}) */
}

let element = document.getElementById('box-1');









element.addEventListener('click', ()=>{console.log(`top: ${element.style.top}, left: ${element.style.left} `)})
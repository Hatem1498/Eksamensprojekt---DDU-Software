let count = 16;

for(let i = 0; i < count; i++){
    let canvas = document.createElement('canvas');
    canvas.id = `box-${i}`;
    canvas.className = "shelf";
    let w = $(window).width();
    canvas.style.width = `${w/4-10}px`;
    canvas.style.height = `${Math.ceil(w/4-50)}px`;
    document.body.appendChild(canvas);
}

let element = document.getElementById('box-1');
let x = 0; let y = 0





const position = { x: 0, y: 0 }

interact(element).draggable({listeners:{start(event){console.log(event.type,event.target)},move(event){position.x+=event.dx;position.y+=event.dy;event.target.style.transform=`translate(${position.x}px,${position.y}px)`},}})
element.addEventListener('click', ()=>{console.log(`top: ${element.style.top}, left: ${element.style.left} `)})
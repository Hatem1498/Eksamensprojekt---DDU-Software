let element = document.getElementById('box-1')
let x = 0; let y = 0

interact(element).draggable({modifiers:[interact.modifiers.snap({targets:[interact.snappers.grid({x:30,y:30})],range:Infinity,relativePoints:[{x:0,y:0}]}),interact.modifiers.restrict({restriction:element.parentNode,elementRect:{top:0,left:0,bottom:1,right:1},endOnly:true})],inertia:true}).on('dragmove',function(event){x+=event.dx; y+=event.dy; event.target.style.transform='translate('+x+'px, '+y+'px)'})
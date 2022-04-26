const burgerBtn = document.getElementsByClassName('burgermenu_btn')[0]
const navbarLinks = document.getElementsByClassName('navbar_links')[0]
const bars = burgerBtn.querySelectorAll(".bar");
//Logic for navbar
burgerBtn.addEventListener('click', () => {
  navbarLinks.classList.toggle('transition');
  setTimeout(()=>{
  navbarLinks.classList.toggle('active');
  burgerBtn.classList.toggle('active'); 
  for(let x = 0; x < bars.length; x++){
    bars[x].classList.toggle('x');
    }
  }, 50);

});


const HOST = location.origin.replace(/^http/, "ws");
const ws = new WebSocket(HOST);



ws.onopen = (ev) => {
    ws.send("site");

}

ws.onmessage = (event) => {
    

};

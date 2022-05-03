$(function(){
    $(".temp").load("../index.html #navbar", function(){
        $.getScript("../js/websocket.js", complete = current);
        $("#navbar").clone().contents().appendTo("#nav");
        $(".temp").remove();
    });
});

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


function current(){
    let URL = window.location.href;

    $(".navbar_links ul li a").each(function(){
        if(this.href == URL){
            $(this).closest("li").addClass("current");
        }
    });

}